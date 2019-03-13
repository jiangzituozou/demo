(function ($) {
    var loadIndex;
    var _beforeSend = function () {
        loadIndex = layer.load();
    };
    var _completeSend = function () {
        layer.closeAll();
    };
    var _error = function (data) {
        setTimeout(function () {
            layer.msg("数据加载失败");
        },300);
        if (loadIndex){
            layer.close(loadIndex);
        }
        throw "数据加载失败";
    };

    var _get = function (url,params,options) {
        return new Promise(function (resolve,reject) {
            var defaultAjaxOptions = {
                type: "get",
                url: url,
                contentType: "application/json",
                dataType: "json",
                beforeSend: _beforeSend,
                complete: _completeSend,
                error: _error
            };
            if (params){
                defaultAjaxOptions.data = params;
            }
            defaultAjaxOptions = $.extend({},defaultAjaxOptions,options);
                $.ajax(defaultAjaxOptions)
                    .done(function (data) {
                        if (data){
                            resolve(data);
                        }else{
                            _error("数据加载失败");
                        }
                        // if (data.success) {
                        //     if (data.data && !$.isEmptyObject(data.data)) {
                        //         resolve(data.data);
                        //     } else {
                        //         resolve();
                        //     }
                        // } else {
                        //     _error("数据加载失败");
                        // }
                    })
        })
    };

    var _post = function (url,requestPayload,options) {
        return new Promise(function (resolve,reject) {
            var defaultAjaxOptions = {
                type: "post",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(requestPayload),
                dataType: "json",
                beforeSend: _beforeSend,
                complete: _completeSend,
                error: _error
            };
                defaultAjaxOptions = $.extend({},defaultAjaxOptions,options);
                $.ajax(defaultAjaxOptions)
                    .done(function (data) {
                        if (data.success){
                            if (data.data && !$.isEmptyObject(data.data)){
                                resolve(data.data);
                            }else{
                                resolve(requestPayload);
                            }
                        }else{
                            _error("数据加载失败");
                        }
                    })
        })
    };

    var _delete = function (url,options) {
        return new Promise(function (resolve,reject) {
            var defaultAjaxOptions = {
                type: "delete",
                url: url,
                dataType: "json",
                beforeSend: _beforeSend,
                complete: _completeSend,
                error: _error
            };
            defaultAjaxOptions = $.extend({},defaultAjaxOptions,options);
            $.ajax(defaultAjaxOptions)
                .done(function (data) {
                    if (data.success){
                        resolve(data);
                    }else{
                        _error("数据加载失败");
                    }
                })
        })
    };

    var _put = function (url,requestPayload,options) {
        return new Promise(function (resolve,reject) {
            var defaultAjaxOptions = {
                type: "put",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(requestPayload),
                dataType: "json",
                beforeSend: _beforeSend,
                complete: _completeSend,
                error: _error
            };
                defaultAjaxOptions.data = $.extend({},defaultAjaxOptions,options);
                $.ajax(defaultAjaxOptions)
                    .done(function (data) {
                        if (data.success){
                            if (data.data && !$.isEmptyObject(data.data)){
                                resolve(data.data);
                            }else{
                                resolve(requestPayload);
                            }
                        }else{
                            _error("数据加载失败");
                        }
                    })
        })
    };
    $.HTTP = {
        "get":_get,
        "put":_put,
        "post":_post,
        "delete":_delete
    };

})(jQuery);