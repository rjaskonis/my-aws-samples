const { Lambda } = require("aws-sdk");

module.exports.handler = async (event) => {
    const lambdaClient = new Lambda();

    await lambdaClient
        .invokeAsync({ FunctionName: "arn:aws:lambda:sa-east-1:255191296425:function:api-timeout-test-fn", InvokeArgs: JSON.stringify({ name: "ok" }) })
        .promise();

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Go Serverless v1.0! Your function executed successfully!",
                input: event,
            },
            null,
            2
        ),
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
