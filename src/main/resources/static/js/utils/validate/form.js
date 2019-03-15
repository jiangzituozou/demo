(function ($) {
    $.fn.extend({
        "checkForm": function (options) {
            var flag = true;//标志每一个输入框中所有检验规则是否执行
            var root = this; //当前应用对象存入root
            var pwd; //密码存储
            var defaults = {
                // 提示信息
                tip_success: '<img src="../../xstatic/ximages/zhengque.png" />', //验证成功提示
                loginname: {   //html中的标签的id值
                    remote: "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>用户登录名已存在",  //验证后的错误提示
                    required : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>用户名不能为空",
                    rangelength:"<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>用户名长度只能在 6-15位字符之间",
                    stringCheck:"<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>只能包括英文字母、数字和下划线 ",
                    reg_rangelength:/^[a-zA-Z0-9]{6,15}$/,   //对应的正则校验
                    reg_stringCheck:/^[a-zA-Z][a-zA-Z0-9_]*$/
                },
                username: {
                    required : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>姓名不能为空",
                    rangelength : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>姓名长度只能在2-20位字符之间",
                    isChineseChar : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>姓名必须为汉字",
                    reg_rangelength:/^[\u4e00-\u9fa5]{2,10}$/,
                    reg_isChineseChar:/^[\u4E00-\u9FA5]+$/,
                },
                company: {
                    required : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>公司/企业名称不能为空"
                },
                yzm: {
                    remote: "<img src='../../xstatic/ximages/cuowu.png ' style='margin-right: 8px;'>验证码不正确",
                    required : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>验证码不能为空"
                },
                phone: {
                    required : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>手机号不能为空",
                    isMobile : "<img src='../../xstatic/ximages/cuowu.png ' style='margin-right: 8px;'>手机号码格式有误，请输入正确的手机号",
                    remote : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>手机号已注册，继续注册请与原账号解绑",
                    reg_isMobile:/^13[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$/
                },
                inviteid: {
                    remote: "<img src='../../xstatic/ximages/cuowu.png ' style='margin-right: 8px;'>邀请码录入不正确",
                    checkFigure:"<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>只能含有数字",
                    reg_checkFigure:/^\d+$/
                },
                confirmPassword: {
                    required : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>请再次输入密码",
                    equalTo:"<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>两次输入密码不一致"
                },
                plainPassword: {
                    required : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>请输入密码",
                    rangelength:"<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>密码长度只能在 6-15位字符之间",
                    stringCheck:"<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>只能包括英文字母、数字和下划线",
                    reg_rangelength:/^[a-zA-Z0-9]{6,15}$/,
                    reg_stringCheck:/^[a-zA-Z0-9_]*$/
                },
                place: {
                    rangelength : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>职位长度只能在2-15位字符之间",
                    reg_rangelength:/^[a-zA-Z0-9]{2,15}$/,
                },
                email: {
                    required : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>邮箱不能为空",
                    stringCheck:"<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>请输入正确的邮箱格式",
                    reg_stringCheck:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                },
                address: {
                    rangelength : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>地址长度只能在4-50位字符之间",
                    reg_rangelength:/^[a-zA-Z0-9]{4,50}$/,
                },
                businmark: {
                    required : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>营业执照注册号不能为空"
                },
                myfiles:{
                    required : "<img src='../../xstatic/ximages/tishi.png ' style='margin-right: 8px;'>请上传营业执照"

                }
            };

            if (options) {        //如果不为空就合并参数
                $.extend(defaults, options)
            }

            // 文本框失去焦点时验证
            $(":text,:password,textarea", root).each(function () {
                $(this).blur(function () {
                    var _validate = $(this).attr("check");
                    if (_validate) {  //如果输入框需要校验，则执行check()方法
                        check($(this), _validate, $(this).val());
                    }
                })
            });
            // 验证方法
            var check = function (obj, _match, _val) {
                //obj为对应的需要校验的输入框
                //match为html中check属性的属性值
                //val为输入框的值
                var id=obj.attr("id");//这里是为了取到对应的元素的校验值defaults[id]
                var value=$.trim(_val);//防止空格
                var arr = _match.split(" ");//校验项字符串转为数组
                for(var i=0;i<arr.length;i++){
                    if(flag==true){  //flag控制是否进行下一项的校验，因此html中check="required isMobile"中的校验项有顺序，需要自己控制
                        switch (arr[i]) {   //arr[i]为校验项
                            case 'required':
                                flag=value ? showMsg(obj, defaults.tip_success, true) : showMsg(obj, defaults[id].required, false);
                                //校验必须字段，及时的更改flag状态，校验成功返回true，失败返回false,成功之后才会进行下一项的校验，失败，直接提示失败文案
                                break;//执行到此，case语句不再往下执行
                            case 'rangelength':
                                if(!value){  //针对非必填项，没有required的校验，所以一定要判断一下value是否为空，空的时候不执行以下的校验项，因为该项可为空
                                    break;
                                }else{
                                    flag=chk(value, defaults[id].reg_rangelength) ? showMsg(obj, defaults.tip_success, true) : showMsg(obj, defaults[id].rangelength, false);
                                    break;
                                }
                            case 'stringCheck':
                                if(!value){
                                    break;
                                }else{
                                    flag=chk(value, defaults[id].reg_stringCheck) ? showMsg(obj, defaults.tip_success, true) : showMsg(obj, defaults[id].stringCheck, false);
                                    break;
                                }
                            case 'pw1':  //该校验项应为password的最后一项校验
                                flag="true";//flag标识
                                pwd = value;  //实时储存
                                var confirmValue=$("#confirmPassword").val();  //确认密码
                                if(value==confirmValue){  //以下校验是为了防止密码和确认密码一致后，再去改动密码，而确认密码不会提示的问题
                                    $("#confirmPassword").attr("flag","true");//当两者一致时，标记确认密码校验通过
                                    showMsg($("#confirmPassword"), defaults.tip_success, true);
                                }else if(value!=confirmValue&&confirmValue){
                                    $("#confirmPassword").attr("flag","false");//当两者不一致时，标记确认密码校验不通过
                                    showMsg($("#confirmPassword"),defaults.confirmPassword.stringCheck, false);
                                }
                                break;
                            case 'pw2'://该校验项应为confirmPassword的最后一项校验
                                if(!value){
                                    break;
                                }else{
                                    flag=pwdEqual(value, pwd) ? showMsg(obj, defaults.tip_success, true) : showMsg(obj, defaults[id].equalTo, false);
                                    break;
                                }
                            case 'isChineseChar':
                                if(!value){
                                    break;
                                }else{
                                    flag=chk(value, defaults[id].reg_isChineseChar) ? showMsg(obj, defaults.tip_success, true) : showMsg(obj, defaults[id].isChineseChar, false);
                                    break;
                                }
                            case 'isMobile':
                                if(!value){
                                    break;
                                }else{
                                    flag=chk(value, defaults[id].reg_isMobile) ? showMsg(obj, defaults.tip_success, true) : showMsg(obj, defaults[id].isMobile, false);
                                    break;
                                }
                            case 'checkFigure':
                                if(!value){
                                    break;
                                }else{
                                    flag=chk(value, defaults[id].reg_checkFigure) ? showMsg(obj, defaults.tip_success, true) : showMsg(obj, defaults[id].checkFigure, false);
                                    break;
                                }
                                defaults:
                                    return true;
                        }
                    }else{  //flag==false时，一定校验不通过，
                        obj.attr("flag",false);
                    }
                    if(i==arr.length-1){  //当校验到最后一项时，需要将flag表示置为true,否则其他校验无法进入
                        //以下是需要调用接口才可验证的项，按照自己需求可就行改造
                        if(flag==true&&id=="phone"){  //校验手机号是否已注册
                            $.ajax({
                                type: "post",
                                async: false,
                                url: "http://www.baidu.com/register/checkPhone",
                                data: {phone: value},
                                dataType: "text",
                                success: function (data) {
                                    if(data=="false"){
                                        showMsg(obj, defaults[id].remote, false);
                                        flag=false;
                                        $(".send-yzm").css("color","rgba(0,0,0,.3)");
                                    }else{  //手机号校验成功
                                        $(".send-yzm").css("color","#313131");
                                    }
                                }
                            });
                        }
                        if(flag==true&&id=="yzm"){  //校验验证码是否正确
                            var phone=$("#phone").val();
                            $.ajax({
                                type: "post",
                                async: false,
                                url: "http://www.baidu.com/register/checkRandom",
                                data: {yzm: value,phone:phone},
                                dataType: "text",
                                success: function (data) {
                                    if(data=="false"){
                                        showMsg(obj, defaults[id].remote, false);
                                        flag=false;
                                    }
                                }
                            });
                        }
                        if(flag==true&&id=="loginname"){  //校验验证码是否正确
                            if(value){
                                $.ajax({
                                    type: "post",
                                    async: false,
                                    url: "http://www.baidu.com/register/checkLoginName",
                                    data: {loginname: value},
                                    dataType: "text",
                                    success: function (data) {
                                        if(data=="false"){
                                            showMsg(obj, defaults[id].remote, false);
                                            flag=false;
                                        }
                                    }
                                });
                            }else{
                                $(obj).next(".errormsg").remove();
                            }

                        }
                        if(flag==true&&id=="inviteid"){  //校验验证码是否正确
                            if(value){
                                $.ajax({
                                    type: "post",
                                    async: false,
                                    url: "http://www.baidu.com/register/checkInvite",
                                    data: {inviteid: value},
                                    dataType: "text",
                                    success: function (data) {
                                        if(data=="false"){
                                            showMsg(obj, defaults[id].remote, false);
                                            flag=false;
                                        }
                                    }
                                });
                            }else{
                                $(obj).next(".errormsg").remove();
                            }
                        }
                        obj.attr("flag",flag);//当前校验项是否通过由flag进行控制
                        flag=true;//全局flag复位
                    }
                }

            };

            //判断两次密码是否一致
            var pwdEqual = function (val1, val2) {
                return val1 == val2 ? true : false;
            };

            //正则验证
            var chk = function (str, reg) {
                return reg.test(str);
            };

            //显示信息
            var showMsg = function (obj, msg, mark) {//文字显示的位置在此处控制
                var id=obj.attr("id");
                if(id=="phone"&&mark==false){
                    $(".send-yzm").css("color","rgba(0,0,0,.3)");
                }
                $(obj).next(".errormsg").remove();
                var _html = "<span class='errormsg' style='font-size:14px;color:#ff3c00;margin-left:10px; '>" + msg + "</span>";
                if(id=="yzm"){
                    $(obj).next().next(".errormsg").remove();
                    $(obj).next().after(_html);
                }else{
                    $(obj).after(_html);
                }
                return mark;
            }

        }
    })
})(jQuery);