(function ($) {

    var _regImgItem = function (string) {
        var imgReg = /<img.*?(?:>|\/>)/gi;//img标签
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;//src属性
        var srcArray = [];
        var imgArray = string.match(imgReg) || [];// 为包含所有img标签的数组
        for (var i = 0; i < imgArray.length; i++) {
            var srcobj = imgArray[i].match(srcReg);
            srcArray.push(srcobj[1]);
        }
        return srcArray;
    };

    var _getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };



    $.commons = {
        regImgItem: _regImgItem,
        getQueryString: _getQueryString
    }
})(jQuery);
//发表新帖窗口
var publishArticle = function () {
    if (authenticationInfo != null && authenticationInfo != '') {
        layer.open({
            type: 2,
            title: '发表新帖',
            maxmin: true,
            shadeClose: false, // 点击遮罩关闭层
            area: ['1100px', '900px'],
            content: "/blog/articleInfo/add",
            success: function () {
                console.log(boardId);
                console.log(boardName);
            }
        });
    } else {
        window.location.href = "http://localhost/admin"
    }
};