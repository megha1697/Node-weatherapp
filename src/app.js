const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicdir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicdir))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Megha'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Megha',
        age: 24
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'Contact xyz for further queries',
        name: 'Megha'
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You mush provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
    
   
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, {Latitude, Longitude, Location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(Latitude, Longitude, (error, data) => {
        if(error){
            return res.send({
                error: error
            })
        }else{
            res.send({
                    Location: Location,
                    Latitude: Latitude,
                    Longitude: Longitude,
                    Data: data
            })
            // res.render('index',{
            //         Location: Location,
            //         Latitude: Latitude,
            //         Longitude: Longitude,
            //         Data: data
            // })
            
            } 
        })
    })
})

app.get('/help/*' , (req,res) => {
    res.render('404', {
        title: '404 ',
        name: 'Megha',
        errorMessage: "Help article not found"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        namr: 'Megha',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Server is listening on port "+port+"...")
})