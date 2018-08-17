
export default class  Const {
    constructor(){
        this.loginApi = "http://www.connectek.com.cn:8093/CustomerSystemServer/CustomerSystemServlet/login";
        this.uploadPicApi = "http://www.connectek.com.cn:8093/CustomerSystemServer/CustomerSystemServlet/MainInfoUpload";
        this.getOddNumber = "http://www.connectek.com.cn:8093/CustomerSystemServer/CustomerSystemServlet/CreateBillNo";
    }
    getNewsData(type,page,callback){
        let url = this.apis[type]+page;
        fetch(url,{
            method:'GET'}).then((response)=>{
            return response.json();
        }).then((data)=>{
            callback(data);
        })
    }
}