const router = require('express').Router();
const Cliente = require('../models/Cliente');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//CREATE - Criação de Dados
router.post('/insertNewClient', checkToken, async (req, res) => {

    const {name, cpf, email, phoneNumber, processNumber, accessKey} = req.body
    const clientExists = await Cliente.findOne({cpf: cpf});

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

// READ - Lista de Clientes

router.get('/', checkToken, async (req, res) => {
    try {

        const cliente = await Cliente.find()
        return res.status(200).json(cliente);

    }catch (err) {
        res.status(500).json({error:err})
    }
})

// READ - Encontrar Cliente pelo ID
router.get('/findById/:id', checkToken, async (req, res) => {
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
router.put('/updateById/:id', checkToken, async (req, res) => {

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

router.delete('/deleteById/:id', checkToken, async(req, res) => {
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

//-----------------------------------------------------------------------
function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: 'Acesso negado!'})
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret);

        next();

    }catch(error) {
        res.status(422).json({message: 'Token Inválido!'})
    }
}

module.exports = router;