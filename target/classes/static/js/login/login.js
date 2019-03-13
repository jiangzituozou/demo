function register() {
    $.ajax({
        //几个参数需要注意一下
        type: "POST",//方法类型
        url: "/register" ,//url
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
        url: "/login" ,//url
        data: $('#login').serialize(),
        success: function (data) {
            console.log(data)
        },
        error : function() {
        }
    });
}