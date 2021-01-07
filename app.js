const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.get('/main.css', (req, res) => res.sendFile(__dirname + '/css/main.css'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  });
  
  http.listen(3000, () => {
    console.log('listening on *:3000');
  });
