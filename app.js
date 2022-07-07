//import http module
const http = require('http')

// import routes.js
const routes = require('./routes')


//create server
const server = http.createServer(routes)

//listen 
server.listen(8080)