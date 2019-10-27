const request = require('request');

const getWeather = (lat, lng, callback) => {
  const ENDPOINT = `https://api.darksky.net/forecast/36e87ad7b3f1fbba7f86a193296ea49f/${lat},${lng}`;
  request({ url: ENDPOINT, json: true }, (error, response) => {
    if(error) {
      callback('Error: Unable to connect ..', undefined);
    } else if(response.body.error) {
      callback(`Error hint: ${response.body.error}`, undefined);
    } else {
      const data = response.body;
      callback(undefined, data.currently);
    }
  });
};

module.exports = getWeather;
