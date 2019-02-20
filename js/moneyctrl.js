$(function () {
    yemian();

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    var page = 1;

    function yemian(id) {
        $.ajax({
            type: "get",
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: {
                pageid: id
            },
            dataType: "json",
            success: function (obj) {
                // console.log(obj);
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

    // 上一页
    $("#previous").on("tap", function () {
        page--;
        yemian(page);
        $('.main-scroll').css('transform', 'translateY(0)');
        $("#selectAge").val(page)
    });

    $("#below").on("tap", function () {
        page++;
        yemian(page);
        $('.main-scroll').css('transform', 'translateY(0)');
        $("#selectAge").val(page);
    });

    // 下一页
    $("#selectAge").on("change", function () {
        // console.log($(this).val());
        page = $(this).val();
        yemian(page);
    });

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