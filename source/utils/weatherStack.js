const request = require("request");

const weatherStack = (long, lat, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=4f0a819bdde7e79ad07f21a1e808d8ad&query=" +
    long +
    "," +
    lat;
  debugger;
  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connecto weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const currentTemp = body.current.temperature;
      const currentChanceOfRain = body.current.precip;
      const currentLocation = body.location.name;
      const currentWeather = body.current.weather_descriptions[0];
      const response =
        "It is currently " +
        currentTemp +
        " degrees celsius in " +
        currentLocation +
        ". " +
        currentChanceOfRain +
        "% chance of rain with " +
        body.current.humidity +
        "% humidity.";
      console.log(body);
      callback(undefined, response);
    }
  });
};

module.exports = weatherStack;
