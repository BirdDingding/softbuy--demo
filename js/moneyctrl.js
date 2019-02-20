$(function () {
    yemian();
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });



    var page;

    var flag = true;
    function yemian(id) {
        // page = pageID;
        // if (page == 0) {
        //     $('#previous').addClass("disabled");
        // } else {
        //     $('#previous').removeClass("disabled");
        // }
        // if (page == 14) {
        //     $('#below').addClass("disabled");
        // } else {
        //     $('#below').removeClass("disabled");
        // }

        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: {
                pageid: 3
            },
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
    $("#main .product-list").on("tap", "li a", function () {
        // 跳转到商品详情界面
        var productId = $(this).attr("data-productId");
        // console.log(productId);
        location.href = "discountProductDetail.html?productId=" + productId;
    })



    function newOpt(allPage) {
        for (var i = 0; i < allPage; i++) {
            var opt = document.createElement('option');
            opt.value = i + 1;
            opt.innerHTML = opt.value + '/' + allPage;
            $('#selectAge').append(opt);
        }
    }
    
    $('#selectAge').change(function (e) {
    
        e.preventDefault();
    
        getData(parseInt(this.value) - 1)
    });
    
});