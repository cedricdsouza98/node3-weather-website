const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', 
        name: 'cedric' 
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Cedric',
        age: 23
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "HELP PAGE",
        name: 'Cedric'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Enter a location."
        })
    }
    geocode(req.query.address, (error , {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search),
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        issue: "help"
    })
})

app.get('*', (req, res) => {
    res.render('404-page')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})