Connect your web app to the internet
====================================

You've created an amazing web app running on port 9000. You can get to it locally at `localhost:9000`. But how anyone on the internet see your website? HTTP requests to your server will come through to port 80 (or 443 for HTTPS). How can you get the requests to your web app and back?

This repo is intended to demonstrate in a very simple way how a web server like nginx handles requests and proxies them to web apps running on the same machine. It also demonstrates how to connect to a TCP socket in node.js.

The repo is made up of two parts. `web-app` is (obviously) our web app. In this case it's just a basic node app serving a single `index.html`, but it could be any kind of complexity. The other part is `server`, which is our internet-facing server. It connects to TCP port 80 (meaning it must be run with `sudo`) and forwards any HTTP requests to the web app by opening a local connection to the web app's port. If it receives any non-HTTP requests it just echoes them back, capitalised.

The code also demonstrates two common features of node.js applications - registering event handlers (e.g. `tcpClient.on("data", data => { ... })`) and piping streams of data.

A 'real' web sever like nginx would be much more efficient by keeping a pool of active connections to the web apps it's serving. It would also handle things like verifying HTTPS connections, caching and serving static assets like HTML and CSS. This means that your web app doesn't need to spend its time serving static files and can focus on generating dynamic content, interacting with a database and so on.

To run the demo, install Docker and then run `docker-compose up` in the project root.
