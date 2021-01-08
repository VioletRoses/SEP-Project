const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.get('/main.css', (req, res) => res.sendFile(__dirname + '/css/main.css'));
app.get('/favicon.ico', (req, res) => res.sendFile(__dirname + '/favicon.ico'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
      console.log(msg);
      io.emit('message', 'Server Recieved Message');
    });
  });

  http.listen(3000, () => {
    console.log('listening on *:3000');
  });
