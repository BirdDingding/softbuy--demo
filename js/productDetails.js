$(function () {
    /* 创建Manmanbuy对象的实例 manmanbuy */
    var manmanbuy = new Manmanbuy();
    // 获取导航栏函数
    manmanbuy.queryNav();
    // 获取商品详情函数
    manmanbuy.queryProductMore();
    // 获取网友评价函数
    manmanbuy.queryComment();
});

/* Manmanbuy的构造函数 */
var Manmanbuy = function () {

};

Manmanbuy.prototype = {
    queryNav:function(){
        var id = this.GetUrlByParamName('categoryid');
        $.ajax({
            url:"http://localhost:9090/api/getcategorybyid",
            data:{categoryid:id},
            success:function(data){
                var html = template('productNavTpl',data);
                $('.nav').html(html);
            },
            error:function(error){//失败的回调函数
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
    queryProductMore:function(){
        var productid = this.GetUrlByParamName('productId');
        $.ajax({
            url:'http://localhost:9090/api/getproduct',
            data:{productid:productid},
            success:function(data){
                var html = template('productMoreTpl',data);
                $('.details').html(html);
            }
        });
    },
    queryComment:function(){
        var productid = this.GetUrlByParamName('productId');
        $.ajax({
            url:'http://localhost:9090/api/getproductcom',
            data:{productid:productid},
            success:function(data){
                var html = template('commentTpl',data);
                $('.evaluate_list .evaluate_info').html(html);
            }
        });
    }
}    