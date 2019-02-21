$(function () {
    $('#footer .right').on('tap',function () {
        mui('#main .mui-scroll-wrapper').scroll().scrollTo(0,0,800);//100毫秒滚动到顶
    });
})
