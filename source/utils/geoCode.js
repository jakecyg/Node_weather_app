const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFrZWN5ZyIsImEiOiJja2Nqemd0eDAwMXB2MndsbGwzZ3lrdjgwIn0.CWywJ_LATxcBiD1BAPtHLA&limit=1';

    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connecto weather service.', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            const latitutde = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;
            const LL = {
                latitude: latitutde,
                longitude: longitude,
                location: location
            };

            callback(undefined, LL);
        }
    });
}

module.exports = geoCode;