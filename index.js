require('dotenv').config({ path: 'C:/Users/geffa/apiServicosWeb/.env'})
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
//---------------------------------------------------------------------------
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@clustertest.cjheduu.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => {
    app.listen(3000);
    console.log("Conectado ao Banco.");
})
.catch((err) => console.log(err))
//----------------------------------------------------------------------------

app.use( express.urlencoded({ extended: true }))
app.use(express.json())

const clienteRoutes = require('./routes/clienteRoutes');
app.use('/clientes', clienteRoutes);

const userAuth = require('./routes/userRoutes');
app.use('/users', userAuth);


