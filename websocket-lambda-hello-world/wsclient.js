const WebSocket = require("ws");
const sockedEndpoint = "wss://2he7qt3p44.execute-api.sa-east-1.amazonaws.com/dev";
const socket = new WebSocket(sockedEndpoint, {
    perMessageDeflate: false,
});

socket.on("open", () => {
    console.log("opened");

    socket.send(JSON.stringify({ action: "message" }));
});

socket.on("error", (e) => console.log(`Error: ${e}`));

socket.on("message", (e) => {
    console.log("message:", e.toString());
});
