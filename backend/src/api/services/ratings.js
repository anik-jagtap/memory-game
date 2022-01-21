let _singleton = true;
let _instance = null;
class Rating {
    constructor() {
        if (_singleton) {
            throw new Error("This is a singleton class. Please use Rating.instance() instead.");
        }
    }
    static instance() {
        if (!_instance) {
            _singleton = false;
            _instance = new Rating();
            _singleton = true;
        }
        return _instance;
    }
    
    calculateRatings(level, timeTaken, errorCount) {
        if (level == "easy") {
            // within 5 min then 3 start 7 then 2 above 1
            // errors 1 -> 3, 2 -> 2, 4 -> 1
            if (timeTaken < 3e5 || errorCount <= 1) {
                return 3;
            } else if (timeTaken < 4.2e5 || errorCount <= 3) {
                return 2;
            } else {
                return 1;
            }
        } else if (level == "medium") {
            // within 10 min then 3 start 12 then 2 above 1
            // errors 5 -> 3, 7 -> 2, >7 -> 1
            if (timeTaken < 6e5 || errorCount <= 5) {
                return 3;
            } else if (timeTaken < 7.2e5 || errorCount <= 7) {
                return 2;
            } else {
                return 1;
            }
        } else {
            // within 15 min then 3 start 20 then 2 above 1
            // errors 7 -> 3, 12 -> 2, >12 -> 1
            if (timeTaken < 9e5 || errorCount <= 7) {
                return 3;
            } else if (timeTaken < 12e5 || errorCount <= 12) {
                return 2;
            } else {
                return 1;
            }
        }
    }
}
export default Rating;