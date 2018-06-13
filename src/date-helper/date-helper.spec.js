import { DateHelper } from './date-helper';

describe('Date Helper', function () {
    let DH = new DateHelper();

    it('should return a string when given time passed',function() {
        let time = Date.now();
        let response = DH.timeAgo(time);
        expect(response).toEqual(jasmine.any(String));
    });
});