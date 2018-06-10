

/* NOT EXPRESS SERVER */


'use strict';

// 1st Party library
const http = require('http');
const cowsay = require('cowsay');

// Local Libraries
// parser will tear the URL apart and give us back an object with things like path, query params, etc.
// it will also deal with POST data and append JSON to req.body if sent
const parser = require('./lib/parser');

const requestHandler = (req,res) => {
  parser(req)
    .then( req => {
      if ( req.method === 'GET' && req.url.pathname === '/' ) {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        let htmlBody = `<!DOCTYPE html>
        <html>
          <head>
            <title> cowsay </title>  
          </head>
          <body>
           <header>
             <nav>
               <ul> 
                 <li><a href="/cowsay">cowsay</a></li>
               </ul>
             </nav>
           <header>
           <main>
           <h1>This project is about building a HTTP server with a main server module and separate modules to parse a request's url and body</h1>
           </main>
          </body>
        </html>`;
        res.write(htmlBody);
        res.end();
        return;
      }
      else if ( req.method === 'GET' && req.url.pathname === '/cowsay' ) {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        // let responseMessage = cowsay.say(
        //     text:req.url.query,
        //   );
        let queryString = req.url.query;
        let responseMessage;
        if((!queryString.text)){
          responseMessage = cowsay.say({text: 'I need something good to say!'});
        }
        else{
          responseMessage = cowsay.say({
            text:req.url.query.text,
          });
        }
        let markup = `<!DOCTYPE html>
        <html>
          <head>
            <title> cowsay </title>  
          </head>
          <body>
            <h1> cowsay </h1>
            <pre>
              <h2>${responseMessage}</h2>
            </pre>
          </body>
        </html>`;
        res.write(markup);
        res.end();
        return;
      }

      else if ( req.method === 'POST' && req.url.pathname === '/api/cowsay' ) {
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        if(!req.body.text){
          res.statusCode = 400;
          res.statusMessage = 'invalid request';
          res.write(JSON.stringify({error : 'invalid request: text query required'}));
        }
        else{
          res.write(JSON.stringify({content : cowsay.say({text:req.body.text})}));
        }
        res.end();
        return;
      } 
      else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.write('Resource Not Found');
        res.end();
      }
    }) // closes the "then" of the parser promise
    .catch(err => {
      res.writeHead(400);
      res.write(err + JSON.stringify({error : 'invalid request: body required'}));
      res.end();
    });
};

// Server callback
const app = http.createServer(requestHandler);

// Expose the start and stop methods.  index.js will call on these.
module.exports = {
  start: (port,callback) => app.listen(port,callback),
  stop: (callback) => app.close(callback),
};