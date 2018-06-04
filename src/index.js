const rp = require("request-promise");
const cheerio = require('cheerio');
const checksum = require('checksum');
require('dotenv').config();

// Intialize Twilio client

const client = require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_TOKEN)

// Variable to store the value of our checksum hash

let hash = '';


function checkURL(siteToCheck) {

    return rp(url).then(response => {

        const $ = cheerio.load(response);
        let jobString = "";

        $(".jobtitle.turnstileLink").each((i, element) => {
            
            jobString += `${element.attribs.title}`
        })

        if (hash === '') {
            hash = checksum(response);
            return;
        }
        
        if (checksum(jobString) !== hash) {
            hash = checksum(jobString);
            return true;
        }

        console.log('No change to report!');
        return false;
    }).catch(err => {
        console.log(`Could not complete fetch of ${url}: ${err}`)
    })

}

function SMS({ body, to, from }) {
    client.messages
        .create({
            body,
            to,
            from
        })
        .then(() => {
            console.log(`Success! Message has been sent to ${to}`)
        })
        .catch(err => {
            console.log(err);
        })
}

const url = `https://www.indeed.com/jobs?q=Junior%20Developer&l=North%20Carolina&ts=1526994524382&rs=1&fromage=last`;

// checkURL(url);
// Checks for updates every 10 seconds
// Asynchronously so the fetch request resolves properly

setInterval(async () => {
    if (await checkURL(url)) {
        console.log('Found a change! Sending SMS...')

        SMS({
            body: `There is a new job posting at ${url}!`,
            to: "+17047710382",
            from: "+19802383728"
        });
    }
}, 10000)