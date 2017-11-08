TCP Server
==========

This repo demos how to build a TCP server in Node. Think of it being a very small, very basic reverse proxy in the mould of nginx.

The TCP server in `/tcp-server` receives connections and handles them according to the application protocol. If the request is an HTTP request it proxies the request to the HTTP server in `/http-server`, running on port 9000. Otherwise it echoes back the request, capitalised.

The TCP server represents something like nginx, which listens to requests on port 80, checks the hostname in the request and forwards it to the corresponding web app. It's running on port 8888 for demo purposes - in production it would be on port 80.

The HTTP server could be something like an Express app running on port 9000. As HTTP requests go to port 80, not 9000, we need something to hook it up to the internet.
