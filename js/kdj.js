$(function () {
    // var couponid = $('#couponid');
    var urlId = location.search;
    urlId = urlId.substring(4)
    // console.log(couponid)
    // console.log(location)

    $.ajax({
        url: "http://localhost:9090/api/getcouponproduct",
        data: {
            couponid: urlId,
        },
        success: function (data) {
            console.log(data)
            var html = template('kfcTpl', data);
            $('#main').html(html);
            // console.log(html)

        }
    });
    // var mask = mui.createMask(function(){
    //     mask.show(); 
    // });//callback为用户点击蒙版时自动执行的回调；
    
    $('#main').on('tap','.details', function () {
        $('#mask').show();
        $('#myCarousel').show();
        // var mask = mui.createMask(callback)
        // callback为用户点击蒙版时自动执行的回调；
        //显示遮罩
        // mask.close(); //关闭遮罩
    })

    $('#mask').on('tap',function(){
        $('#mask').hide()
        $('#myCarousel').hide();
    })

    $('#myCarousel').on('slide.bs.carousel');
})