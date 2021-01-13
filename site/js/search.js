var socket = io();
var input = document.getElementById('input');
var form = document.getElementById('form');
var pageNum = 1;
var query = '';


form.addEventListener('submit', function(e) {
	e.preventDefault();
	pageNum = 1;
	document.getElementById('results').remove();
	var resultsList = document.createElement('ul');
	resultsList.setAttribute('id', 'results')
	document.body.appendChild(resultsList);
	if (input.value) {
		query = input.value;
		socket.emit('query', input.value);
		input.value = '';
	}
});

function extendResults() {
	pageNum++;
	document.getElementById('showMore').remove();
	socket.emit('pageNum', pageNum);
	socket.emit('query', query);
}

socket.on('results', function(res) {
	console.log(res);
	var results = document.getElementById('results');
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
	var extendResultsButton = document.createElement('li').setAttribute('id', 'showMore');
	var extendResultsLink = document.createElement('a').setAttribute('href', 'javascript:extendResults()');
	results.appendChild(extendResultsButton);
});

socket.on('log', function(msg) {
	console.log(msg);
});