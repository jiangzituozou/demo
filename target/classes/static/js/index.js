$(document).ready(function () {
    var ddh = new Date().getTime(); //订单号

    //支付
    $('.mypay').click(function () {
        var ip = returnCitySN["cip"]; //ip
        var desc = $('.mydesc').val();
        var fee = $('.myfee').val();
        var pay = $('.mypay').find('option:selected').val();
        //签名
        var sign = hex_md5(muspay_id + ddh + fee + notify_url + muspay_key);

        var index = layer.load();
        layer.msg('正在提交请稍后...');

        var data = {'fxid': muspay_id, 'fxddh': ddh, 'fxdesc': desc, 'fxfee': fee, 'fxattch': attch, 'fxnotifyurl': notify_url, 'fxbackurl': back_url, 'fxpay': pay, 'fxip': ip, 'fxsign': sign, 'fxnoback': 1, 't': Math.random()};

        location.href = http_build_query(data);
    });

    //同步
    if ($('.mybackurl').length > 0) {
        var $_GET = (function () {
            var url = window.document.location.href.toString();
            var u = url.split("?");
            if (typeof (u[1]) == "string") {
                u = u[1].split("&");
                var get = {};
                for (var i in u) {
                    var j = u[i].split("=");
                    get[j[0]] = j[1];
                }
                return get;
            } else {
                return {};
            }
        })();

        var data = $_GET;
        var fxid = data['fxid']; //商户编号
        var fxddh = data['fxddh']; //商户订单号
        var fxorder = data['fxorder']; //平台订单号
        var fxdesc = data['fxdesc']; //商品名称
        var fxfee = data['fxfee']; //交易金额
        var fxattch = data['fxattch']; //附加信息
        var fxstatus = data['fxstatus']; //订单状态
        var fxtime = data['fxtime']; //支付时间
        var fxsign = data['fxsign']; //md5验证签名串

        var mysign = hex_md5(fxstatus + fxid + fxddh + fxfee + muspay_key); //验证签名
        if (mysign == fxsign) {
            $('.mybackurl').html('签名验证错误。');
            return false;
        }
        if (fxstatus == '1') {//支付成功
            //支付成功 转入支付成功页面
            $('.mybackurl').html('支付成功');
        } else { //支付失败
            $('.mybackurl').html('支付失败，请以异步回调为准。');
        }
    }
    
    //订单查询
    $('.myorderquery').click(function () {
        var index = layer.load();
        var ddh = $('.myddh').val();
        var myaction = 'orderquery';
        var sign = hex_md5(muspay_id + ddh + myaction + muspay_key); //加密
        var data = {'fxid': muspay_id, 'fxddh': ddh, 'fxaction': myaction, 'fxsign': sign, 't': Math.random()};
        
        location.href = http_build_query(data);
    });

    //余额查询
    $('.mybalance').click(function () {
        var mydate = getNowDate();
        var myaction = 'money';
        //签名
        var sign = hex_md5(muspay_id + mydate + myaction + muspay_key);

        var index = layer.load();
        var data = {'fxid': muspay_id, 'fxdate': mydate, 'fxaction': myaction, 'fxsign': sign, 't': Math.random()};

        location.href = http_build_query(data);
    });

});