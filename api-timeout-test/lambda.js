const { SES } = require("aws-sdk");

module.exports.handler = async (event) => {
    console.log("event:", event);

    const sesClient = new SES();
    const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

    console.log("I'm triggered!");

    await sleep(20000);

    await sesClient
        .sendEmail({
            Destination: {
                ToAddresses: ["rjaskonis@gmail.com"],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: "Process done!!",
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "Lambda asynchronous invokation",
                },
            },
            Source: "rjaskonis@gmail.com",
        })
        .promise();

    console.log("E-mail sent!");

    return {
        statusCode: 200,
        body: JSON.stringify("Triggered successfuly"),
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
