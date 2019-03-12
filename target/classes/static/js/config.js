var muspay_id = '2019685'; //商户号
var muspay_key = 'alEInnvZUXOeztXPJohMnMIpTVydiuHG'; //商户秘钥
var muspay_wg = 'https://api.xxv.cn/Pay'; //网关

// muspay_id = '2018108'; //商户号
// muspay_key = 'fjZoFEAnwmdYykFcxsvmorYxqURXJHWS'; //商户秘钥
// muspay_wg = 'https://api.xxv.cn/Pay'; //网关

var notify_url = '119.29.54.82/pay'; //异步地址
var back_url = '119.29.54.82/pay'; //同步地址
var attch = 'mytest'; //透传

function http_build_query(data) {
    var httpd = muspay_wg + '?';
    for (var i in data) {
        httpd = httpd + i + '=' + data[i] + '&';
    }
    httpd = httpd.substr(0, httpd.length - 2);
    return httpd;
}

function getNowDate() {
    var date = new Date();
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1; // 月
    var day = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds() //秒
    // 给一位数数据前面加 “0”
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    var currentdate = year + month + day + hour + minutes + seconds;
    return currentdate;
}