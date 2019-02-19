$(function(){
    productlist(1)
    // 导航栏请求
    $.ajax({
        url:"http://localhost:9090/api/getbaicaijiatitle",
        dataType:"json",
        success:function(res){
            console.log(res);
            var html = template('navTpl',res);
            $('#nav ul').html(html);
        }
    })
    // 导航栏的初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            scrollX: true, //是否横向滚动
            indicators: false, //是否显示滚动条
            deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
    });
    //搜索显示和隐藏
    $('#nav').on('tap','.search',function(){
        if ($('.show-input').css('display')=='none') {
            $('.show-input').css('display','block');
        }else{
            $('.show-input').css('display','none');
        }
    })

    // 滚动显示隐藏搜索框
    $(document).on('scroll',function(){
        var scrollTop = $('#main .mui-scroll').css('transform');
        console.log(scrollTop);
        scrollTop = parseInt(scrollTop.split(',')[1]);
        if (scrollTop < -300) {
            $('#nav').hide();
            $('#header .show-input').hide();
        }else{
            $('#nav').show();
        }
    })
    

    // 导航栏切换页面数据的请求
    $('#nav ul').on('tap','li a',function(){
        $(this).addClass('active').parent().addClass('active').siblings().removeClass('active').children().removeClass('active');
        var id = $(this).data('id');
        // console.log(id);
        productlist(id);
        
    })

    // 主体商品的请求
       function productlist(id){
        $.ajax({
            url:"http://localhost:9090/api/getbaicaijiaproduct",
            data:{titleid:id},
            success:function(res){
                console.log(res);
                var html = template('mainTpl',res);
                $('#main ul').html(html);         
            }
            
        })
       } 
})