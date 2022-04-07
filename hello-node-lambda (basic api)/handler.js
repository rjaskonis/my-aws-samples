"use strict";
const fs = require("fs");

module.exports.helloWorld = (event, context, callback) => {
    const page = fs.readFileSync("./page.html");

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Content-Type": "text/html",
        },
        // body: JSON.stringify({
        //     message: "Hello World!!!",
        //     author: "Renne Jaskonis"
        // }),
        // body: `<h3>Hello World, Renne Jaskonis!</h3>`,
        body: page.toString(),
    };

    callback(null, response);
};
