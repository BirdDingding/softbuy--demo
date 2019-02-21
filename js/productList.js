$(function () {
    /* 创建Manmanbuy对象的实例 manmanbuy */
    var manmanbuy = new Manmanbuy();
    // 获取导航栏函数
    manmanbuy.queryNav();
    // 获取主体数据函数
    manmanbuy.queryMain();
    /* 翻页 */
    manmanbuy.fanYe();

    
    // 初始化页数
    var page = 1;
    // 获取传过来的id,
    var id = getUrlId('cagegoryId');
    // 发送请求
    $.ajax({
        url: 'http://localhost:9090/api/getcategorybyid',
        data: {
            categoryid: id
        },
        success: function(data){
            console.log(data)
        }
    })

    // 创建获取id的方法
    function getUrlId(name){
        //正则表达式
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        // 通过地址字符串截取获取id
        var URL = decodeURI(window.location.search);
        var r = URL.substr(1).match(reg);
        if (r != null) {
            //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
            return decodeURI(r[2]);
        };
        return null;
    }
});

/* Manmanbuy的构造函数 */
var Manmanbuy = function () {

};

Manmanbuy.prototype = {
    page: 1, //初始化当前页数
    queryNav: function () {
        var id = this.GetUrlByParamName('categoryId');
        $.ajax({
            url: "http://localhost:9090/api/getcategorybyid",
            data: {
                categoryid: id
            },
            success: function (data) {
                var html = template('productNavTpl', data);
                $('.nav').html(html);
            },
            error: function (error) { //失败的回调函数
                console.log(err);
            }
        });
    },
    /* 获取URL中的指定参数 */
    GetUrlByParamName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var URL = decodeURI(window.location.search);
        var r = URL.substr(1).match(reg);
        if (r != null) {
            //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
            return decodeURI(r[2]);
        };
        return null;
    },
    queryMain: function () {
        var id = this.GetUrlByParamName('categoryId');
        var that = this;
        $.ajax({
            url: 'http://localhost:9090/api/getproductlist',
            data: {
                categoryid: id,
                pageid: that.page
            },
            success: function (data) {
                var html = template('productListTpl', data);
                $('#main').html(html);
            }
        });
    },
    /* 翻页按钮点击事件 */
    fanYe: function () {
        var that = this;
        /* 上一页 */
        $('#shangYiYe').on('tap', function () {

            if (that.page > 1) {
                that.page = that.page - 1;
            } else {
                return;
            }

            var id = that.GetUrlByParamName('categoryId');
            $.ajax({
                url: 'http://localhost:9090/api/getproductlist',
                data: {
                    categoryid: id,
                    pageid: that.page
                },
                success: function (data) {
                    var html = template('productListTpl', data);
                    $('#main').html(html);
                    scrollTo(0,0);
                }
            })

        })
        /* 下一页 */
        $('#xiaYiYe').on('tap', function () {

            that.page = that.page + 1;

            var id = that.GetUrlByParamName('categoryId');
            $.ajax({
                url: 'http://localhost:9090/api/getproductlist',
                data: {
                    categoryid: id,
                    pageid: that.page
                },
                success: function (data) {
                    var html = template('productListTpl', data);
                    $('#main').html(html);
                    scrollTo(0,0);
                }
            })

        })







    }

}