const http = require("http");
const api = require ('./src/app');
const port = process.env.PROSPIPORT || 3001;
const server = http.createServer(api);

server.listen(port,()=> console.log(`server levantado en ${port}`));