var express = require('express');
var app = express();
var redis = require('redis');
const ShareDB = require('sharedb');
const ShareDBRedis = require('sharedb-redis');
const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const http = require('http');

// set the view engine to ejs
app.set('view engine', 'ejs');
const server = http.createServer(app);

const redisClient = redis.createClient();
const share = new ShareDB({
  db: new ShareDBRedis({client: redisClient})
}); 
//websocket server
wss = new WebSocket.Server({server});  
wss.on('connection', (ws)=>{
    const stream = new WebSocketJSONStream(ws);
    share.listen(stream);
})
// public folder to store assets
app.use(express.static(__dirname + '/public'));

// routes for app
app.get('/', function(req, res) {
  res.render('view');
});

// listen on port 8000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 8000;
app.listen(port);