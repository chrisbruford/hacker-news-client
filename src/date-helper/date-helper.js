export class DateHelper {
    timeAgo(time) {
        let diff = Date.now() - time;

        let answer = "Just now";
        let secondsAgo = diff / 1000;

        if (secondsAgo < 60) {
            return answer;
        }

        let minutesAgo = secondsAgo / 60;
        let unit = minutesAgo === 1 ? "minute":"minutes"
        if (minutesAgo < 60) {
            return `${Math.round(minutesAgo)} ${unit} ago`
        }

        let hoursAgo = minutesAgo / 60;
        unit = hoursAgo === 1 ? "hour":"hours"

        if (hoursAgo < 24) {
            return `${Math.round(hoursAgo)} ${unit} ago`
        }

        let daysAgo = hoursAgo / 24;
        unit = daysAgo === 1 ? "day" : "days";
        return `${Math.round(daysAgo)} ${unit} ago`;

    }
}