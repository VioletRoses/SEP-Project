const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var axios = require("axios").default;
var options = {
  method: 'GET',
  url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI', 
  params: {q: 'topical', pageNumber: '1', pageSize: '50', autoCorrect: 'true'},
  headers: {
    'x-rapidapi-key': '9f3980d96emshfeec0b04d23d3f0p1344dcjsn4727ef038e0f',
    'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
  }
};

app.get('/main.css', (req, res) => res.sendFile(__dirname + '/css/main.css'));
app.get('/favicon.ico', (req, res) => res.sendFile(__dirname + '/favicon.ico'));
app.get('/search.js', (req, res) => res.sendFile(__dirname + '/js/search.js'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('query', (qry) => {
      console.log(qry);
      var results = [];
      var pageNum = 1;
      options.params.q = qry;
        axios.request(options).then(function (response) {
          console.log(response.data);
          for (let index = 0; index < response.data.value.length; index++) {
            const element = response.data.value[index];
            if (element.url.includes('.org')) {
              results.push(element);
            } else if (element.url.includes('.edu')) {
              results.push(element);
            } else if (element.url.includes('.gov')) {
              results.push(element);
            }
          }
          pageNum++;
          socket.emit('results', results);
        }).catch(function (error) {
          console.error(error);
        });
      console.log('Searched for: ' + qry);
      socket.emit('log', qry);
      
    });
    
  });

  http.listen(3000, () => {
    console.log('listening on *:3000');
  });
