const http = require('http'); // required the http module
const fs = require('fs');  //require the inbuilt file system module that provides an API for interacting with the file system
const PORT = 3000;

// Using the createServer function we can actually create a basic http server using http module
// This function returns a server object, and takes a callback as an argument.
// This function created a server object but didn't start the server
const server = http.createServer(function listener(request, response) {
    /**
     * request(type object) -> we will be able to see details of incoming http request  
     * response (type object) -> we will be able to configure what response we need to send
     *                          for an incoming http request -> object
     */
    // this callback is a kind of listener function that is going to collect 
    // every http request that we will make to our server

    // TODO..
    if(request.url == '/home') {
        // if we make a request on /home this if block will be executed
        //console.log(request.method); //request.method tells the server the type of incoming request weather its a GET/POST/...etc
        
        response.end("WELCOME : YOU ARE HITTING MY LOCAL SERVER"); //response.end sends the response to the incoming request
    }
    // how can we send an HTML code, or JSON from this setup ?
    else if(request.url == '/html') {
        fs.readFile('HTTPserver/index.html', (err, data) => {
          if (err) 
          {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Error reading file');
          } 
          else 
          {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
          }
        });
    }
    else
    {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Page not found');
    }
    
    console.log("Request received");
});

server.listen(PORT, function exec() {
    // once we succesfully boot up the server on the given port, this callback will be executed. 
    console.log(`Server is Up and running on PORT: ${PORT}`);
});