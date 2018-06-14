export class HN {
    getTopNews() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');

            xhr.onerror = err => {
                reject(err);
            }

            xhr.onabort = err => {
                reject(err);
            }

            xhr.onload = evt => {
                if (xhr.status == 200 && xhr.responseText) {
                    try {
                        let data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } catch (e) {
                        reject({ error: e, data: xhr.responseText });
                    }
                } else {
                    reject(`Unable to retrieve data: \n server code: ${xhr.status} \n responseText: ${xhr.statusText}`);
                }
            }

            xhr.send();
        });
    }

    getItem(itemID) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`);

            xhr.onerror = err => {
                reject(err);
            }

            xhr.onabort = err => {
                reject(err);
            }

            xhr.onload = evt => {
                if (xhr.status == 200 && xhr.responseText) {
                    try {
                        let data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } catch (e) {
                        reject({ error: e, data: xhr.responseText });
                    }
                } else {
                    reject(`Unable to retrieve data: \n server code: ${xhr.status} \n responseText: ${xhr.statusText}`);
                }
            }

            xhr.send();
        });
    }
}