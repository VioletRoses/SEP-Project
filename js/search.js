import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/spelling/AutoComplete',
  params: {text: 'yeet s'},
  headers: {
    'x-rapidapi-key': '9f3980d96emshfeec0b04d23d3f0p1344dcjsn4727ef038e0f',
    'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
