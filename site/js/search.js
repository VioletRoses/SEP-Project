var socket = io();
var input = document.getElementById('input');
var form = document.getElementById('form');
var pageNumber = 1;
var query = '';
var loadingWheel = document.getElementById("loading-wheel");
loadingWheel.hidden = true;

form.addEventListener('submit', function(e) {
	e.preventDefault();
	loadingWheel.hidden = false;
	pageNum = 1;
	document.getElementById('results').remove();
	var resultsList = document.createElement('ul');
	resultsList.setAttribute('id', 'results')
	document.body.appendChild(resultsList);
	if (input.value) {
		query = input.value;
		socket.emit('query', [input.value, pageNumber]);
		input.value = '';
	}
});

function extendResults() {
	loadingWheel.hidden = false;
	document.getElementById('showMore').remove();
	socket.emit('query', [query, pageNumber]);
}

socket.on('results', function(res) {
	console.log(res);
	var scrollY = window.scrollY;
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
	}
	var extendResultsButton = document.createElement('li');
	extendResultsButton.setAttribute('id', 'showMore');
	var extendResultsLink = document.createElement('a');
	extendResultsLink.setAttribute('href', 'javascript:extendResults()');
	extendResultsLink.textContent = 'Show More';
	extendResultsButton.appendChild(extendResultsLink);
	results.appendChild(extendResultsButton);
	loadingWheel.hidden = true;
	window.scrollTo(0, scrollY - 50);
});

socket.on('pageNum', function (pageNum) {
	pageNumber = pageNum;
});

socket.on('log', function(msg) {
	console.log(msg);
});