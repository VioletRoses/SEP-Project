var socket = io();
var input = document.getElementById('input');
var form = document.getElementById('form');
var pageNumber = 1;
var query = '';
var loadingWheel;

form.addEventListener('submit', function(e) {
	e.preventDefault();
	setLoading(true);
	pageNum = 1;
	document.getElementById('results').remove();
	var resultsList = document.createElement('ul');
	resultsList.setAttribute('id', 'results')
	document.body.appendChild(resultsList);
	if (input.value) {
		query = input.value;
		socket.emit('query', [input.value, 1]);
		input.value = '';
	}
});

function setLoading(bool) {
	if(bool) {
		loadingWheel = document.createElement('div');
		var centerWrap = document.createElement('center');
		var loadingWheelImg = document.createElement('img');
		

		loadingWheelImg.setAttribute('src', '/img/loading-wheel.webp');
		loadingWheelImg.setAttribute('id', 'loading-wheel');
		
		centerWrap.appendChild(loadingWheel);

		for (let i = 0; i < 2; i++) loadingWheel.appendChild(document.createElement('br'));
		loadingWheel.appendChild(loadingWheelImg);
		document.body.appendChild(loadingWheel);
	} else {
		loadingWheel.remove();
	}
}

function extendResults() {
	setLoading(true);
	window.scrollTo(0, 99999);
	document.getElementById('showMore').remove();
	socket.emit('query', [query, pageNumber]);
}

socket.on('results', function(res) {
	console.log("Results:");
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

		titleLink.setAttribute('href', element.url); //Makes title a clickable link
		urlLink.setAttribute('href', element.url); //Makes URL a clickable link
		title.setAttribute('id', 'title');

		titleLink.textContent = element.title; //Sets text of elements
		urlLink.textContent = element.url;
		if (element.body.length > 350) body.textContent = element.body.substring(0, 350) + '...'; //If body text is longer than 350 characters, shortens it down
		else body.textContent = element.body;

		title.appendChild(titleLink); //Connects the elements together
		results.appendChild(title);
		url.appendChild(urlLink);
		results.appendChild(url);
		results.appendChild(body);
		results.appendChild(document.createElement('br'));
	}
	var extendResultsButton = document.createElement('li');
	var extendResultsLink = document.createElement('a');

	extendResultsButton.setAttribute('id', 'showMore');
	extendResultsLink.setAttribute('href', 'javascript:extendResults()');

	extendResultsLink.textContent = 'Show More';

	extendResultsButton.appendChild(extendResultsLink);
	results.appendChild(extendResultsButton);

	setLoading(false);
	window.scrollTo(0, scrollY - 50);
});

socket.on('error', function (error) {
	console.log("Error from server:");
	console.error(error);
});

socket.on('pageNum', function (pageNum) {
	pageNumber = pageNum;
});

socket.on('log', function(msg) {
	console.log(msg);
});