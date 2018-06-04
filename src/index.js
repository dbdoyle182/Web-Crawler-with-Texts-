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
rp(url).then(response => console.log(checksum(response)));