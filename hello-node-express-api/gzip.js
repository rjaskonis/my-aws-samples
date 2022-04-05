const zlib = require("zlib");

function gzip(data) {
    return new Promise((resolve, reject) => {
        zlib.gzip(data, (err, response) => {
            if (err) reject(err);

            resolve(response);
        });
    });
}

module.exports = gzip;
