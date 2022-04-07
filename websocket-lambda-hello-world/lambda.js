const AWS = require("aws-sdk");

async function handler(event) {
    console.log("event: ", JSON.stringify(event, null, 4));
    // console.log("process.env: ", JSON.stringify(process.env, null, 4));

    const apig = new AWS.ApiGatewayManagementApi({ endpoint: "2he7qt3p44.execute-api.sa-east-1.amazonaws.com/dev" });

    const {
        requestContext: { connectionId, routeKey },
    } = event;

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
                    .postToConnection({ ConnectionId: connectionId, Data: Buffer.from("Hello World from server") })
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
