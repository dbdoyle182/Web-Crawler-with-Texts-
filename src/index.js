const rp = require("request-promise");
const url = `https://www.indeed.com/jobs?q=Junior%20Developer&l=North%20Carolina&ts=1526994524382&rs=1&fromage=last`;
rp(url).then(response => console.log(response));