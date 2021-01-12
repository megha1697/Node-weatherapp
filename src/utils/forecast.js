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
            const is_day = body.current.is_day
            if(is_day === 'yes'){
                greet = 'Good Morning:)! '
            }else{
                greet = 'Good night:)! '
            }
            callback(undefined,"Hi "+greet+", Climate here is "+weather +". With Humidity of "+body.current.humidity+ ' It is currently '+body.current.temperature + ' degrees out. But it feels like ' + body.current.feelslike + " degrees. " )
        } 
})
}

module.exports = forecast