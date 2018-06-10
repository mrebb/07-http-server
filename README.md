![cf](https://i.imgur.com/7v5ASc8.png) Lab 07: Vanilla HTTP Server
======
<img src="https://travis-ci.com/mrebb/07-http-server.svg?branch=master">

TRAVIS:
HEROKU:

## Vanilla HTTP Server 

* Handles GET and POST methods by building object into cowsay module
* GET handles '/' and 'cowsay/text='''
* POST handles '/api/cowsay' . Takes object as input and returns cowsay version of object 
* Errors are handled when there is a bad request
