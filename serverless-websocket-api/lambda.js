const AWS = require("aws-sdk");

async function handler(event) {
    console.log("event: ", JSON.stringify(event, null, 4));

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
                        Data: Buffer.from("Hello from server. Used serverless framework to create this one"),
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
