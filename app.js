var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var axios = require("axios").default;

var options = {
	method: 'GET',
	url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI', 
	params: {q: 'topical', pageNumber: '1', pageSize: '50', autoCorrect: 'true', safeSearch: 'true'},
	headers: {
		'x-rapidapi-key': '9f3980d96emshfeec0b04d23d3f0p1344dcjsn4727ef038e0f',
		'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
	}
}

var whitelist = [".org", ".edu", ".gov", "bbc.com", "reuters.com", "usatoday.com", "bloomberg.com", "thehill.com", "time.com",
				 "wsj.com", "politico.com", "theguardian.com", "washingtonpost.com", "nytimes.com"]; //Allowed websites and domain endings

var blacklist = ["blog", "editorial", "opinion", "911truth.org", "answersingenesis.org", "avn.org.au"]; //Websites not allowed that may also fall under the whitelist

app.use(express.static(path.join(__dirname, 'site')));
http.listen(3000, console.log('listening on *:3000')); //Sets server to listen on port 3000


	


	io.on('connection', (socket) => {

		function search(resultsNumber, currentResults, pageNum) {
			var results = currentResults;
			options.params.pageNumber = pageNum;
			axios.request(options).then(function (response) { //Retrieves search results from API
				for (let index = 0; index < response.data.value.length; index++) { //Loops through and filters search results
					const element = response.data.value[index];
					var allowed = false;
					for(let index = 0; index < whitelist.length; index++) {
						if (element.url.includes(whitelist[index])){
							allowed = true;
						}
					}
					for(let index = 0; index < blacklist.length; index++) {
						if(element.url.includes(blacklist[index])) allowed = false;
					}
					if(allowed) results.push(element);
				}
				console.log(results);
				console.log(pageNum);
				if(results.length < resultsNumber) return search(20, results, pageNum + 1);
				else {
					socket.emit('results', results);
					socket.emit('pageNum', pageNum + 1);
				}
			}).catch(function (error) {
				console.error(error);
			});
		}

		socket.on('query', (qry) => {
			console.log('Searched for: ' + qry[0]); //Logs search the user made
			options.params.q = qry[0]; //Changes search option to user's query
			var results = search(20, [], qry[1]);
			
		});
		socket.on('pageNum', (pageNum) => {
			options.params.pageNumber = pageNum; //Sets page number user is searching for
		});
	});
