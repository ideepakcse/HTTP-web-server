const http = require('http'); // required the inbuilt http module
const fs = require('fs');  //require the inbuilt file system module that provides an API for interacting with the file system
const PORT = 3000;

// Using the createServer function we can actually create a basic http server using http module
// This function returns a server object, and takes a callback as an argument.
// This function created a server object but didn't start the server
const server = http.createServer(function listener(request, response) {
    /**
     * request(type object) -> we will be able to see details of incoming http request  
     * response (type object) -> we will be able to configure what response we need to send for an incoming http request
     *  
     */
    // this callback is a kind of listener function that is going to collect every http request that we will make to our server

    // TODO..
    if(request.url == '/home') 
    {
        // if we make a request on /home this if block will be executed
        //console.log(request.method); //request.method tells the server the type of incoming request weather its a GET/POST/...etc
        response.end("WELCOME : YOU ARE HITTING MY LOCAL SERVER"); //response.end sends a response back to the incoming request
    }

    // how can we send an HTML code, or JSON from this setup ?

    //To send an HTML file as a response to a request received by a web server in Node.js using the 'http' module
    //you can use the 'fs' module to read the contents of the HTML file and then send it as the response body
    else if(request.url == '/html') {
        //The fs.readFile() method in Node.js is a built-in method of the fs module that is used to read the contents of a file asynchronously.
        //fs.readFile() is used to read the contents of the file located at /path/to/file.extn. 
        //The method takes two arguments: the first argument is the path to the file to be read, 
        //and the second argument is a callback function that will be called when the file has been read. 
        //The callback function takes two arguments: the first argument is an error object (if an error occurs), 
        //and the second argument is the contents of the file as a Buffer object. 
        //If an error occurs while reading the file, the error object will be passed to the callback function. 
        //If no error occurs, the contents of the file will be passed to the callback function as the second argument
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
          //If the requested URL is '/', the server will read the contents of the index.html file using fs.readFile(). 
          //If there's an error reading the file, the server will respond with a 500 status code and an error message. 
          //Otherwise, the server will respond with a 200 status code and the contents of the HTML file as the response body.
        });
    }
    else
    {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        //response.writeHead() is called to write the response headers for an HTTP response. 
        //The method takes two arguments: the first argument is the HTTP status code to be sent in the response (in this case, 404), 
        //and the second argument is an object that specifies the response headers to be sent. 
        //In this case, we are sending a Content-Type header with a value of text/plain, 
        //which specifies that the response body will be plain text. 
        //After the headers are written, the res.end() method is called to send the response body to the client.
        response.end('Page not found');
    }
    console.log("Request received");

});

server.listen(PORT, function exec() {
    // once we succesfully boot up the server on the given port, this callback will be executed. 
    console.log(`Server is Up and running on PORT: ${PORT}`);
});
