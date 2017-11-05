const net = require("net")

// Specify TCP port server will listen on
const port = 8888
// Listen on every IP address available to the server
const host = "0.0.0.0"

// Create server
const server = new net.Server

// Register server as listener on TCP port
server.listen(port, host, () => {
  console.log(`Server connected to ${host}:${port}`)
})

// Handler for when OS notifies server than new TCP connection made
server.on("connection", socket => {
  console.log(`New connection from ${socket.remoteAddress}:${socket.remotePort}`)

  // Handler for when data is received over this connection
  socket.on("data", data => {
    console.log(data.toString())
  })
})
