const path = require('path')
const hbs = require('hbs')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        about: 'Use this page to search  videos',
    })
})

//inicar el servidor
app.listen(port, () => {

    console.log('server is up port  '+port)
})