const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=taylor%20swift&pageNumber=1&pageSize=10&autoCorrect=true&safeSearch=true",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "9f3980d96emshfeec0b04d23d3f0p1344dcjsn4727ef038e0f",
		"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
