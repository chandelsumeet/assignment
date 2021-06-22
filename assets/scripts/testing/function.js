const fetch = require("node-fetch");
// requesting a external api as local url was not working while testing
const fetchData = ()=>{

   return fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res =>res.json())
    .catch(error => error);
}

exports.fetchData = fetchData;