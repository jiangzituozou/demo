function register() {
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        url: "/userRegister" ,//url
        data: $('#register').serialize(),
        success: function (data) {
            console.log(data)
        },
        error : function() {
        }
    });
}
function login() {
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        url: "/userLogin" ,//url
        data: $('#login').serialize(),
        success: function (data) {
            console.log(data)
        },
        error : function() {
        }
    });
}
//发送验证码
function sendCheckNumber() {
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        url: "/sendCheckNumber" ,//url
        data: {
            'telephone':$("#reg_telephone").val()
        },
        success: function (data) {
            console.log(data)
        },
        error : function() {
        }
    });
}