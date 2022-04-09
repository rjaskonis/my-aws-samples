const AWS = require("aws-sdk");

async function handler(event, context, callback) {
    console.log("event: ", JSON.stringify(event, null, 4));

    if (event.httpMethod || (event.requestContext && event.requestContext.http)) {
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
            body: `<h3>Hello World, Renne Jaskonis!</h3>`,
        };

        return callback(null, response);
    }

    const {
        requestContext: { domainName, stage, connectionId, routeKey },
    } = event;
    const endpoint = `${domainName}/${stage}`;

    const apig = new AWS.ApiGatewayManagementApi({ endpoint });

    switch (routeKey) {
        case "$connect":
            console.log(`Client connected with id ${connectionId}`);
            break;
        case "$disconnect":
            console.log(`Client with id ${connectionId} disconnected`);
            break;
        case "message":
            console.log("Message received");

            try {
                await apig
                    .postToConnection({
                        ConnectionId: connectionId,
                        Data: Buffer.from("Hello from server using serverless, right!?"),
                    })
                    .promise();

                console.log("Message sent to client succesfully");
            } catch (error) {
                console.log(`Error occurred on client responding: ${error}`);
            }

            break;
    }

    return {
        statusCode: 200,
    };
}

module.exports = {
    handler,
};
