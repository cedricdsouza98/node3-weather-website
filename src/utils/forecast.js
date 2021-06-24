const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b294934c0a9d9f7e5fe6e83d13df18cb&query='+ lat +',' + lon +'&units=f'
    request({url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to the internet', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' +body.current.temperature + ' degrees out. It currently feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '. The wind speed is ' + body.current.wind_speed)
        }
    })
}

module.exports = forecast