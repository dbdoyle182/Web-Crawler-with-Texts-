const rp = require("request-promise");
const checksum = require('checksum')


// Variable to store the value of our checksum hash

let hash = '';


function checkURL(siteToCheck) {

    return rp(url).then(response => {

        if(hash === '') {
            hash = checksum(response);
            return;
        }

        return hash !== checksum(response);

    })

}

const url = `https://www.indeed.com/jobs?q=Junior%20Developer&l=North%20Carolina&ts=1526994524382&rs=1&fromage=last`;

// Checks for updates every 10 seconds
// Asynchronously so the fetch request resolves properly

setInterval(async () => {
    console.log(await checkURL(url));
}, 10000)