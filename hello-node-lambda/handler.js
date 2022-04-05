require("dotenv").config();

const result = require("./result");

module.exports.helloWorld = (event, context, callback) => {
    console.log(process.env.MY_VAR);

    console.log(event.queryStringParameters);

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        body: JSON.stringify({ ...result, ...event.queryStringParameters }),
    };

    callback(null, response);
};
