"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const ws_1 = require("ws");
const express = require("express");
const consumer_1 = require("./consumer");
dotenv.config();
const PORT = parseInt(process.env.PORT) || 3210;
const app = express();
// Server static files
app.use(express.static('./'));
const server = new ws_1.Server({ server: app.listen(PORT) });
function send(message) {
    server.clients.forEach((client) => {
        client.send(message.value);
    });
}
server.on('connection', () => {
    // subscribe to the `test` stream
    consumer_1.kafkaSubscribe('test', (message) => {
        send(message);
    });
});
console.log(`Server listening: http://localhost:${PORT}`);
//# sourceMappingURL=server.js.map