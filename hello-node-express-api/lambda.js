const { awsExpressHandler } = require("./server");
const gzip = require("./gzip");

async function handler(event, context, callback) {
    const gzippedResponse = await gzip("Hello");

    return callback(null, {
        isBase64Encoded: true,
        body: gzippedResponse,
        headers: {
            "Content-Encoding": "gzip",
        },
    });

    zlib.gzip('{ "message": "My response" }', function (error, gzippedResponse) {
        if (error) {
            console.log(error);
            callback(error);
        } else
            callback(null, {
                body: gzippedResponse.toString("base64"),
                isBase64Encoded: true,
                statusCode: 200,
                headers: {
                    "Content-Encoding": "gzip",
                },
            });
    });
}

module.exports = {
    // handler,
    handler: awsExpressHandler,
};
