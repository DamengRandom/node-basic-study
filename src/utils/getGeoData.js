const request = require('request');
// const https = reqire('https');

const getGeoData = (location, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYWhxaSIsImEiOiJjang0aGRjeGkwOXJyNDN0Njdhc2lkdTQ5In0.-VfORVFXwkwQi4bqKbj4OQ`;
  request({ url: geoUrl, json: true }, (error, response) => {
    if(error) {
      callback('Error Message: Unable to connect ..', undefined);
    } else if(response.body.features.length === 0) {
      callback('Unable to find the proper location ..', undefined);
    } else {
      const data = response.body;

      callback(undefined, {
        location,
        lat: data.features[0].center[1],
        lng: data.features[0].center[0]
      });
    }
  });
}

module.exports = getGeoData;
