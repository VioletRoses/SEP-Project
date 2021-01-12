var socket = io();
var input = document.getElementById('input');
var form = document.getElementById('form');
var results = document.getElementById('results');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('query', input.value);
    input.value = '';
  }
});

socket.on('results', function(res) {
  console.log(res);
  for (let index = 0; index < res.length; index++) {
    const element = res[index];
    var title = document.createElement('li');
    var titleLink = document.createElement('a');
    var url = document.createElement('li');
    var urlLink = document.createElement('a');
    var body = document.createElement('li');
    titleLink.setAttribute('href', element.url);
    urlLink.setAttribute('href', element.url);
    title.setAttribute('id', 'title');
    titleLink.textContent = element.title;
    title.appendChild(titleLink);
    results.appendChild(title);
    urlLink.textContent = element.url;
    url.appendChild(urlLink);
    results.appendChild(url);
    body.textContent = element.body;
    if (body.textContent.length > 350) {
      body.textContent = body.textContent.substring(0, 350) + '...';
    }
    results.appendChild(body);
    results.appendChild(document.createElement('br'));
    window.scrollTo(0, document.body.scrollHeight);
  }
});

socket.on('log', function(msg) {
  console.log(msg);
});