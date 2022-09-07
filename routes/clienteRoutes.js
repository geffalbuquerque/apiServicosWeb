const router = require('express').Router();
const Cliente = require('../models/Cliente');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//CREATE - Criação de Dados
router.post('/', async (req, res) => {

    const {name, cpf, email, phoneNumber, processNumber, accessKey} = req.body
    const clientExists = Cliente.findOne({cpf: cpf});

    if(clientExists){
        return res.status(422).json({message: 'Já existe um cliente cadastrado com este CPF!'})
    }
    if(!name) {
        return res.status(400).json({message: 'O nome é obrigatório!'})
    }
    if(!cpf) {
        return res.status(400).json({message: 'O nome é obrigatório!'})
    }
    if(!phoneNumber) {
        return res.status(400).json({message: 'O nome é obrigatório!'})
    }

    const cliente = {
        name,
        cpf,
        email,
        phoneNumber,
        processNumber,
        accessKey,
    }

    try {
        //criar dados
        await Cliente.create(cliente)
        return res.status(201).send('Cliente inserido no sistema com sucesso!')

    }catch(err) {
        res.status(500).json({error: err})
    }
})

//READ - Leitura dos Dados

router.get('/', async (req, res) => {
    try {

        const cliente = await Cliente.find()
        return res.status(200).json(cliente);

    }catch (err) {
        res.status(500).json({error:err})
    }
})

router.get('/findById/:id', async (req, res) => {
    const id = req.params.id

    try {
        
        const cliente = await Cliente.findOne({_id: id})

        if(!cliente){
            res.status(404).json({message: "Cliente não encontrado."})
            return;
        }

        res.status(200).json(cliente);

    }catch (err) {
        res.status(500).json({error:err})
    }
})


//UPDATE - Alteração de Dados
router.put('/updateById/:id', async (req, res) => {

    const id = req.params.id
    const {name, cpf, email, phoneNumber, processNumber, accessKey} = req.body
    const cliente = {
        name,
        cpf,
        email,
        phoneNumber,
        processNumber,
        accessKey,
    }

    try {
        const updatecliente = await Cliente.updateOne({_id: id}, cliente)
        
        if(updatecliente.matchedCount === 0){
            res.status(404).json({message: "Cliente não encontrado. Verifique o ID!"})
            return;
        }
        console.log('Dados atualizados com sucesso!');
        return res.status(200).json(cliente);       

    }catch (err) {
        res.status(500).json({error:err})
    }

})


//DELETE - Deletar Dados

router.delete('/deleteById/:id', async(req, res) => {
    const id = req.params.id

    const cliente = await Cliente.findOne({_id: id})

    if(!cliente){
        res.status(404).json({message: "Cliente não encontrado."})
        return
    }

    try {
        await Cliente.deleteOne({_id: id}, cliente)
        res.status(200).send("Cliente removido com sucesso!");
        
    }catch (err) {
        res.status(500).json({error:err})
    }


})

module.exports = router;