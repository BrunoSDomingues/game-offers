const http = require("http");
// const isEmpty = require("is-empty");

const url_deals = new URL("http://www.cheapshark.com/api/1.0/deals");
const url_games = new URL("http://www.cheapshark.com/api/1.0/games");
const url_alerts = new URL("http://www.cheapshark.com/api/1.0/alerts");

function containsEncodedComponents(x) {
    return (x !== decodeURIComponent(x));
}

// Gets ALL JSON outputs of requests

function getJSON(url, params) {
    Object.keys(params).forEach(key => {
        if (containsEncodedComponents(params[key])){
            while (params[key] !== decodeURIComponent(params[key])){
                params[key] = decodeURIComponent(params[key])
            }
        }
        url.searchParams.append(key, params[key])
    })

    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let { statusCode } = res;
            let contentType = res.headers['content-type'];

            let error;

            if (statusCode !== 200) {
                error = new Error("Request failed.\n" + `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
            }

            if (error) {
                console.error(error.message);
                res.resume();
            }

            res.setEncoding('utf-8');
            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    reject(e.message);
                }
            });
        }).on('error', (e) => {
            reject(`Got error ${e.message}`)
        });
    })
}

// Example:

// let p = { id: "X8sebHhbc1Ga0dTkgg59WgyM506af9oNZZJLU9uSrX8%25253D" };
// getJSON(url_deals, p)
//     .then(resp => {
//         if (!isEmpty(resp)) {
//             console.log(resp)
//         } else { 
//             console.log("Request retornou vazio")
//         }
//     })
//     .catch(err => {
//         console.log(err)
//     })

// Returns if the alert was successfully set/deleted

function controlAlert(url, params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let { statusCode } = res;
            let contentType = res.headers['content-type'];

            let error;

            if (statusCode !== 200) {
                error = new Error("Request failed.\n" + `Status Code: ${statusCode}`);
            } else if (!/^text\/html/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                    `Expected text/html but received ${contentType}`);
            }

            if (error) {
                console.error(error.message);
                res.resume();
            }

            res.setEncoding('utf-8');
            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (e) {
                    reject(e.message);
                }
            });
        }).on('error', (e) => {
            reject(`Got error ${e.message}`)
        });
    })
}

// Example:

// let params = { action: "set", email: "test@test.com", gameID: 130, price: 14.99 };

// controlAlert(url_alerts, params)
//     .then(resp => {
//         if (!isEmpty(resp)) {
//             console.log(resp)
//         } else { console.log("Request retornou vazio") }
//     })
//     .catch(err => {
//         console.log(err)
//     })
