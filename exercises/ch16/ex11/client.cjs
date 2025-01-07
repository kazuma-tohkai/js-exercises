const net = require("net");

const maxClients = 30000;
let clientCount = 0;
for (let i = 0; i < maxClients; i++) {
  const client = net.createConnection({ port: 8000 }, () => {
    clientCount++;
    console.log(`connect: Client count: ${clientCount}`);
  });
  client.on("end", () => {
    clientCount--;
    console.log(`disconnect: Client count: ${clientCount}`);
  });
}
