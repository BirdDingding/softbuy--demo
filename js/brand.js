$(function () {

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 数据渲染
    $.ajax({
        url: "http://localhost:9090/api/getbrandtitle",
        success: function (res) {
            var html = template('brandlistTpl',res);
            $('.brand-name').html(html);           
        }
    });

    $('#footer .right').on('tap',function () {
        mui('#main .mui-scroll-wrapper').scroll().scrollTo(0,0,800);//100毫秒滚动到顶
    })

})