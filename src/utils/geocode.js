const request = require('request')

const geocode = (address, callback) => {
    console.log("Your location is : "+ address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2hpa3UxMjMiLCJhIjoiY2tqZnMwd3djNGljNDJzbGduZWFmcjFkNSJ9.EB-MHijVWp4xwHW9agBBOA&limit=1'
    request({ url, json:true}, (error, { body }) =>{
        //console.log(response.body.features)
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0){
            callback('Unable to connect to location. Try another search' , undefined)
        } else {
            callback(undefined, {
                Location: body.features[0].place_name,
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports= geocode