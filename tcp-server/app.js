const net = require("net")

// Specify TCP port server will listen on and port web app is running on
const PUBLIC_PORT = 8888
const APP_PORT = 9000

// Listen on every IP address available to the server
const HOST = "0.0.0.0"

// Create server
const server = new net.Server

// Register server as listener on TCP port
server.listen(PUBLIC_PORT, HOST, () => {
  console.log(`Server connected to ${HOST}:${PUBLIC_PORT}`)
})

// Handler for when OS notifies server than new TCP connection made
server.on("connection", tcpClient => {
  console.log(`New connection from ${tcpClient.remoteAddress}:${tcpClient.remotePort}`)

  // Create a new TCP connection to our web app running on port 9000
  // We're using "http" here because we're using Docker. Normally you'd use "localhost"
  webApp = net.createConnection(APP_PORT, "http", () => {
    console.log("Connected to HTTP web app");

    // Send client request to web app and web app response back to client
    // tcpClient.pipe(webApp).pipe(tcpClient)
  })

  // The piping above can be implemented using event handlers as below
  tcpClient.on("data", data => {
    if (data.includes("HTTP/1.1")) {
      webApp.write(data)
    } else {
      // If it's not an HTTP request just echo back
      tcpClient.write(data.toString().toUpperCase())
    }
  })

  webApp.on("data", data => {
    tcpClient.write(data)
  })

  webApp.on("end", () => {
    tcpClient.end()
  })
})
