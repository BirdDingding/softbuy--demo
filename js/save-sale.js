$(function () {
    // 获取通过URL传过来的参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var productId = getQueryString("productId");
    $.ajax({
        type: "get",
        url: "http://localhost:9090/api/getmoneyctrlproduct",
        data: {
            "productid": productId
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            // 将数据渲染到界面上
            var html = template("productHtmlTpl", data);
            // console.log(productHtml);
            $("#main .main-scroll").html(html);
        }
    });

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

    })







