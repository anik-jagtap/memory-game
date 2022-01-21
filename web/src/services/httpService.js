import axios from "axios";
let _singleton = true;
let _instance;
class HttpService {
    constructor(){
        if(_singleton){
            throw new SyntaxError('This is a singleton class. Please use HttpService.instance instead!');
        }        
    }

    static get GET () { return "get"; }
    static get POST () { return "post"; }
    static get PUT () { return "put"; }
    static get API () { return "http://localhost:3002"; }

    static get instance(){
        if (!_instance) {
            _singleton = false;
            _instance = new HttpService();
            _singleton = true;
        }
        return _instance;
    }


    async requestServer(method, url, data) {
        const headers = {
            "Content-Type": "application/json; charset=utf-8",
        }
        let response;
        try {
            const requestUrl = HttpService.API+url;
            response = await axios.request({
                url: requestUrl,
                method,
                headers,
                data
            })
            return response.data;
        } catch (e) {
            console.log("Exception", e);
            return {
                error: true,
                message: e.message
            }
        }
    }

}
export default HttpService;