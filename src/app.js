const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const requests = require('requests')

const app = express()
const port = process.env.PORT || 8001
const static_path = path.join(__dirname, '../public')
const templates_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', templates_path)
hbs.registerPartials(partials_path)

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static(static_path))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

// default object for weather data
const default_obj = {
    output_status : 'Enter the city name to see',
    temp: 0,
    weather_status: 'None',
}

app.get('/weather', (req, res) => {
    if (req.query) {
        const cityname = req.query.cityname
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=e56df4762281a3442e899211379f93e3&&units=metric`
        
        requests(api)

        .on('data', (chunk) => {
            const objData = JSON.parse(chunk)
            // console.log(objData)

            if(objData.cod === 200) {
                const l = Math.floor(Math.random()*objData.weather.length)
                // console.log(l, objData.weather)

                res.render('weather', {
                    output_status: `${objData.name}, ${objData.sys.country}`,
                    temp: Math.round((objData.main.temp)*100)/100,
                    weather_status: objData.weather[l].main,
                })
            }
            else {
                const revert = default_obj.output_status
                default_obj.output_status = 'Please enter the correct city name'
        
                res.render('weather', default_obj)
        
                default_obj.output_status = revert
            }
        })
    }
    else {
        res.render('weather', default_obj)
    }
})

app.get('*', (req, res) => {
    res.render('error')
})

app.listen(port, () => {
    console.log(`listening to the port ${port}`)
})