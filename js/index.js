$(function () {
    // 点击显示更多
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    $('.menu').on('tap','.one', function () {
        $('.menu').toggleClass('active');
        
    })


    $.ajax({
        url: "http://localhost:9090/api/getindexmenu",
        success: function (data) {
            // console.log(data);

            var html = template('navlistTpl', data);
            // console.log(html);

            $('.productlist').html(html);
        }
    })

    $.ajax({
        url:'http://localhost:9090/api/getmoneyctrl',
        success: function(data){
            console.log(data);
            var html = template('sale-list',data);
            $('.sales-list ul').html(html);
        }
    })

    $.ajax({

    }

    )


})