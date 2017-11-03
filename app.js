const net = require("net")

// Specify local host and port
const host = "0.0.0.0"
const port = 8888

const server = net.createServer(sock => {
  // Print the address and port of a computer connecting to us
  console.log(`Connected to ${sock.remoteAddress}:${sock.remotePort}`)

  sock.on("data", data => {
    // Some data has been sent
    if (data.includes("HTTP/1.1")) {
      console.log("omg HTTP")
    }
  })

  sock.on("close", data => {
    // Remote computer has closed the connection
    console.log("CLOSED")
  })
})

server.listen(port, host, () => {
  console.log("Server listening on: ", server.address())
})
