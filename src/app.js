const express = require('express')
const path = require('path')
const hbs = require('hbs')

require('dotenv').config()
require('./db/mongoose')

const videoRouter = require('./routers/video')
const frontRouter = require('./routers/front')
const commentRouter = require('./routers/comment')

const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', videoRouter)
app.use('/api', commentRouter)
app.use(frontRouter)



app.get('', (req, res) => {
    res.render('index', {
        about: 'Use this page to search  videos cyalvarez',
    })
})

module.exports=app
