const net = require("net")

// Specify TCP port for internet server and web app to listen on
const PUBLIC_PORT = 80 // Anything connecting to a port below 1024 needs to run with sudo
const APP_PORT = 9000

// Listen on every IP address available to the server
const HOST = "0.0.0.0"
// We're using "web-app" here because we're using Docker. Normally you'd use "localhost"
const APP_HOST = "web-app"

// Create server
const server = new net.Server

// Register server as listener on TCP port
server.listen(PUBLIC_PORT, HOST, () => {
  console.log(`Server connected to ${HOST}:${PUBLIC_PORT}`)
})

// Handler for when OS notifies server that new TCP connection made (i.e. from internet)
server.on("connection", tcpClient => {
  console.log(`New connection from ${tcpClient.remoteAddress}:${tcpClient.remotePort}`)

  // Create a new TCP connection to our web app running on port 9000
  const webApp = net.createConnection(APP_PORT, APP_HOST, () => {
    console.log("Connected to HTTP web app")

    // Send internet client request to web app and web app response back to client
    // tcpClient.pipe(webApp).pipe(tcpClient)
  })

  // The piping above can be implemented using event handlers as below
  // allowing us to inspect the data and route accordingly
  tcpClient.on("data", data => {
    if (data.includes("HTTP/1.1")) {
      // We've got an HTTP request, so pass on to the web app
      // If we had multiple web apps we could check the Host header in the request
      // and route the request to port of the correct web app
      webApp.write(data)
    } else {
      // If it's not an HTTP request just echo back
      tcpClient.write(data.toString().toUpperCase())
    }
  })

  // When the web app responds, forward it back to client on the internet
  webApp.on("data", data => {
    tcpClient.end(data)
  })
})
