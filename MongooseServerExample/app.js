const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {globalHandlerError, AppError} = require('./utils/appError')
require('dotenv').config({path: './variables.env'})
const db = require('./config/db')

db.conectar();

app.use(bodyParser.json())
app.use(morgan('combined'))

//Endpoints
const ProductoRouter = require('./routes/ProductoRouter')
app.use('/api/productos', ProductoRouter)
const VentaRouter = require('./routes/VentaRouter')
app.use('/api/ventas', VentaRouter)

app.all('*', (req, res, next)=>{
    next(new AppError('No se pudo acceder a la ruta especificada', 404))
})

app.use(globalHandlerError)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('Servidor corriendo en el puerto '+ port)
})

