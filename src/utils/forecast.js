const request = require('request')

const forecast = (latitude, longitude,callback) => {
    console.log("Searching for coordinates..... " + latitude,longitude )
    const url = 'http://api.weatherstack.com/current?access_key=aa7b4bfbdc060fe32759ff04b875c453&query='+latitude+','+longitude//&language=hi'
    request({ url, json: true},(error, { body })=>{
    if(error){
        callback('Unable to connect to weather service!!', undefined)
    }else if(body.current === undefined){
            callback('Unable to find location. Try another search' , undefined)
    }else{
            const weather = body.current.weather_descriptions[0]
            callback(undefined, weather + ' It is currently '+body.current.temperature + ' degrees out. There is ' + body.current.feelslike + "% chance of rain")
        } 
})
}

module.exports = forecast