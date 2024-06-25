const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

// server.on('connection', (ws) => {
//     console.log('Client connected');

//     ws.on('message', (message) => {
//         console.log('Received:', message);
//         // Echo the received message back to the client
//         ws.send(`${message}`);
//     });

//     ws.on('close', () => console.log('Client disconnected'));

//     ws.on('error', (error) => console.log('Error:', error));
// });

// console.log('WebSocket server is running on ws://localhost:8080');

server.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        console.log('Received:', message);
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`${message}`);
            }
        });
    });
    
    // ws.send(`${message}`);
});

console.log('WebSocket server is running on ws://localhost:8080');
