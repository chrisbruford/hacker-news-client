import { HN } from './hn.api';
require('jasmine-ajax');

describe('HackerNews API', function () {

    let dummyNews = [9129911, 9129199, 9127761, 9128141, 9128264, 9127792, 9129248, 9127092, 9128367, 9038733];
    let dummyItem = {
        "by" : "dhouston",
        "descendants" : 71,
        "id" : 8863,
        "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
        "score" : 111,
        "time" : 1175714200,
        "title" : "My YC app: Dropbox - Throw away your USB drive",
        "type" : "story",
        "url" : "http://www.getdropbox.com/u/2/screencast.html"
      }

    let dummyNewsResponse = {
        status: 200,
        responseText: JSON.stringify(dummyNews)
    };

    let dummyItemResponse = {
        status: 200,
        responseText: JSON.stringify(dummyItem)
    }

    let hackerNews = new HN();

    beforeAll(function () {

    });

    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    })

    it('exists', function () {
        expect(HN).not.toBe(undefined);
    });

    it('retrieves top stories from the homepage API', function (done) {
        hackerNews.getTopNews()
            .then(newsItems => {
                expect(newsItems).toEqual(dummyNews);
                done();
            })
            .catch(err => {
                fail(err);
                done();
            })

        let request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        expect(request.method).toBe('GET');
        request.respondWith(dummyNewsResponse);
    });

    it('retrieves any item from HN', function (done) {
        hackerNews.getItem(8863).then(item => {
            expect(item).toEqual(dummyItem);
            done();
        })
            .catch(err => {
                fail(err);
                done();
            })

        let request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toBe('https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty');
        expect(request.method).toBe('GET');
        request.respondWith(dummyItemResponse);
    });

})