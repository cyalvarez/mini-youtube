const path = require('path')
const hbs = require('hbs')
const express = require('express')
const apiRouter = require('./routers/api')
const frontRouter = require('./routers/front')
require('dotenv').config()
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api',apiRouter)
app.use(frontRouter)


app.get('', (req, res) => { 
    res.render('index', {
        about: 'Use this page to search  videos cyalvarez',
    })
})

//inicar el servidor
app.listen(port, () => {

    console.log('server is up port  ' + port)
})