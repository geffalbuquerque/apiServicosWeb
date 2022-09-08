require('dotenv').config({ path: 'C:/Users/geffa/apiServicosWeb/.env'})
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

router.post('/auth/register', async (req, res) => {
    
    const {name, email, oab, password, confirmpassword} = req.body;
    const userExists = await User.findOne({email: email});
    
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User ({
        name,
        email,
        oab,
        password:passwordHash,
    });

    if(!name){
        return res.status(400).json({message: 'O nome é obrigatório!'})
    }
    
    if(!email){
        return res.status(400).json({message: 'O email é obrigatório!'})
    }
    
    if(!oab){
        return res.status(400).json({message: 'O Número da OAB é obrigatório!'})
    }
    
    if(!password){
        return res.status(400).json({message: 'A senha é obrigatória!'})
    }
    
    if(confirmpassword != password){
        return res.status(400).json({message: 'Senhas não compatíveis! Confira sua senha e tente novamente.'})
    }

    if(userExists){
        return res.status(422).json({message: 'Já existe um usuário cadastrado com este e-mail!'})
    }
    
    try {
        
        await user.save();
        return res.status(201).send('Usuário registrado com sucesso!');

    }catch (err) {
        return res.status(500).send({ error: 'Registration failed' });
    }

});

//Login do Usuário
router.post('/auth/login', async(req, res) =>{
    const { email, password } = req.body;
    const user = await User.findOne({email: email});

    if(!email){
        return res.status(400).json({message: 'O email é obrigatório!'})
    }

    if(!password){
        return res.status(400).json({message: 'A senha é obrigatória!'})
    }

    if(!user){
        return res.status(404).json({message: 'Usuário não encontrado!'})
    }


    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
        return res.status(401).json({message: 'Senha inválida!'})
    }
   
    try {

        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret);
        return res.status(200).json({message: 'Autenticação realizada com sucesso!', token});

    }catch (err) {
        return res.status(500).send({ error: 'Aconteceu algum erro e não foi possível fazer a autenticação. Tente novamente!' });
    }
})


//Consulta Usuários
router.get('/', checkToken, async (req, res) => {

    try {

        const users = await User.find()
        res.status(200).json(users);

    }catch (err) {
        res.status(500).json({error:err})
    }
});

//Atualiza Usuários
router.put('/:id', checkToken, async (req, res) => {

    const id = req.params.id
    const {name, email, oab, password} = req.body;
    const user = {
        name,
        email,
        oab,
        password,
    }
   
       try {
           
           const userUpdate = await User.updateOne({_id: id}, user);

           if(userUpdate.matchedCount === 0){
            res.status(404).json({error: "Usuário não encontrado. Verifique o ID!"})
            return;
        }

           return res.status(201).json(user);
   
       }catch (err) {
           return res.status(500).send({ error: 'Update failed' });
       }
   });

//Exclui Usuários
router.delete('/:id', checkToken, async(req, res) => {
    const id = req.params.id
    const user = await User.findOne({_id: id})

    if(!user){
        res.status(404).json({message: "Usuário não encontrado. Verifique o ID!"})
        return
    }

    try {
        await User.deleteOne({_id: id}, user)
        res.status(200).send('Usuário removido com sucesso!');

    }catch (err) {
        res.status(500).json({error:err})
    }
});

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