$(function () {
    queryProducts();

    areaScroll();

    function queryProducts() {
        $.ajax({
            type: "get",
            url: "http://localhost:9090/api/getinlanddiscount",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.length <= 0) {
                    return;
                }
                var productListHtml = template("productListTpl", data);
                // console.log(productListHtml);
                $("#main .product-list").html(productListHtml);
                // 瞄点定位
                uptop();
            }
        });

    }

    function areaScroll() {
        var that = this;
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹f
        });
    };


    // 给商品添加点击事件
    $("#main .product-list").on("tap", "li a",function () {
            // 跳转到商品详情界面
            var productId = $(this).attr("data-productId");
            // console.log(productId);
            location.href = "discountProductDetail.html?productId=" + productId;
    })


    function uptop() {
        //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
        var scroll = mui('.mui-scroll-wrapper').scroll();
        $('.mui-scroll-wrapper').on('scroll', function (e) {
            // console.log(scroll.y);
            if (scroll.y < -500) {
                $("#uptop").show();
            } else {
                $("#uptop").hide();
                return;
            }
        })
        $("#uptop a").on("tap", function (e) {
            mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
        })

    }

    $('#footer .right').on('tap',function () {
        mui('#main .mui-scroll-wrapper').scroll().scrollTo(0,0,800);//100毫秒滚动到顶
    });
})