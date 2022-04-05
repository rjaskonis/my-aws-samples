"use strict";

module.exports.handler = async (event) => {
    console.log("Great!!");
    console.log(`Invoked on `, new Date());

    return {
        statusCode: 200,
        body: JSON.stringify(`Hello ${event.name || 'darling'}`),
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
