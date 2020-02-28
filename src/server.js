const express = require('express');
const app = express();
const cors = require('cors')
const authMid = require('./middlewares/auth')

app.use(cors())

// let allowCrossDomain = (req,res,next) =>{
//     res.header('Access-Control-Allow-Origin','*')
//     res.header('Access-Control-Allow-Methods','*')
//     res.header('Access-Control-Allow-Headers','*')
//     next()
// }

// app.use(allowCrossDomain)

app.use(express.json());

const auth = require('./routes/authRoutes');
const series = require('./routes/seriesRoutes');
const categorias = require('./routes/categoriasRoutes')

app.use('/auth', auth)

app.use(authMid)

app.use('/series', series);

app.use('/categorias',categorias)

module.exports = app;