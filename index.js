const express = require("express");
const http = require('http');
const WebSocket = require("ws");

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
    console.log("new client connected");

    ws.on("message", message => {
        console.log(`${message}`);
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });



    ws.on("close", () => {
        console.log("client Disconnected!");
    });
});
server.listen(port,()=>{
    console.log(`server is listening on port ${port}!`);
})