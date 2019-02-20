$(function () {
    yemian();

    // 区域滚动
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    function yemian(id) {
        $.ajax({
            type: "get",
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: {
                pageid: id
            },
            dataType: "json",
            success: function (obj) {
                console.log(obj);
                var html = template('moneyCtrl', {
                    list: obj.result
                });
                $('.main-scroll ul').html(html);
            }
        });
    }
    // 给商品添加点击事件
    $("#main .product-list").on("tap", "li", function () {
        // 跳转到商品详情界面
        var productId = $(this).attr("data-id");
        // console.log(productId);
        location.href = "save-sale.html?productId=" + productId;
    })

    // 给返回顶部添加样
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    var scroll = mui('.mui-scroll-wrapper').scroll();
    $('.mui-scroll-wrapper').on('scroll', function (e) {
        // console.log(scroll.y);
        if (scroll.y < -400) {
            $("#uptop").show();
        } else {
            $("#uptop").hide();
            return;
        }
    })
    $("#uptop a").on("tap", function (e) {
        mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
    })
});