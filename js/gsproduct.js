$(function () {
    // 加载商品头部标题
    $.ajax({
        url: 'http://47.52.242.30:9090/api/getgsshop',
        success: function (data) {
            var html = template('navshopTpl', data);
            $('.shangpin-down').html(html);
            var li = $('.shangpin-down li');
            $('.shangpin-down li').each(function (index, value) {
                if (index == 0) {
                    // console.log(this);
                    var text = $(this).text();
                    var titleLi = "<li><a href='javascript:;'>" + text + "<i class='glyphicon glyphicon-menu-down'>" + "</i></a></li>"
                    $('.shangpin-title').html(titleLi)
                }
            })
        }
    })
    // 商品头部标题点击事件
    $('.shangpin-title').on('tap', 'a', function () {
        $('.shangpin-down').toggle().siblings('.down').hide();
    });
    // 加载地区头部标题  
    $.ajax({
        url: 'http://47.52.242.30:9090/api/getgsshoparea',
        success: function (data) {

            var html = template('navdiquTpl', data);
            $('.diqu-down').html(html);
            var li = $('.diqu-down li');
            $('.diqu-down li').each(function (index, value) {

                if (index == 0) {
                    console.log(this);
                    var text = $(this).text().substring(0, 2);

                    var titleLi = "<li><a href='javascript:;'>" + text + "<i class='glyphicon glyphicon-menu-down'>" + "</i></a></li>"

                    $('.diqu-title').html(titleLi)
                }
            })
        }
    })
    // 地区头部标题点击事件
    $('.diqu-title').on('tap', 'a', function () {
        $('.diqu-down').toggle().siblings('.down').hide();
    });

    var shopid = 0;
    var areaid = 0;
    queryshop(shopid, areaid);
    var totalproduct;
    // 查询商品列表的函数
    function queryshop(shop, area) {
        $.ajax({
            url: 'http://47.52.242.30:9090/api/getgsproduct',
            data: {
                shopid: shop,
                areaid: area
            },
            success: function (data) {
                var sum = 0;
                var html = template('shoplistTpl', data);
                $('.product-list').html(html);
                console.log(shopid, areaid);
                // 获取价格
                totalproduct = document.querySelectorAll('.product-list .product');
                for (var i = 0; i < totalproduct.length; i++) {
                    var oneprice = Number($(totalproduct[i]).data('price').substring(1));
                    sum += oneprice; }
                sum = sum.toFixed(2)
                $('.price-down li').text(sum + "元");
            }
        })
    }
    // 选择头部列表添加到头部的事件
    $('body').on('tap', '>ul>li', function () {
        var type = $(this).data('type');
        $(this).parent().hide();
        if (type == 'shop') {
            var id = $(this).data('id');
            shopid = id;
            queryshop(id, areaid);
            var text = $(this).text();
            var titleLi = "<li><a href='javascript:;'>" + text + "<i class='glyphicon glyphicon-menu-down'>" + "</i></a></li>"
            $('.shangpin-title').html(titleLi)
        } else if (type == 'area') {
            var id = $(this).data('id');
            areaid = id;
            queryshop(shopid, areaid);
            var text = $(this).text().substring(0, 2);
            var titleLi = "<li><a href='javascript:;'>" + text + "<i class='glyphicon glyphicon-menu-down'>" + "</i></a></li>"
            $('.diqu-title').html(titleLi);

        }
    })
    // 价格标题的点击事件
    $('.price-title').on('tap', 'a', function () {
        $('.price-down').toggle().siblings('.down').hide();

    });
    // 区域滚动的初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 点击右边搜索按钮
    $('#nav .right>a').on('tap', function () {
        $('#nav .left').addClass('bounceOutLeft');
        $('#search').fadeIn(2000);
        $('.more').hide();
        $('.search-btn').show();
    })
    // 切换搜索界面的事件
    $('.search-btn').on('tap', function () {
        //    获取搜索框的内容
        var searchVal = $('#search').val().trim();
        var goodsname = document.querySelectorAll('.product-name');
        var result = [];
        if (!searchVal) {
            alert('请输入内容');
        } else {

            for (let i = 0; i < goodsname.length; i++) {

                if ($(goodsname[i]).text().indexOf(searchVal) != -1) {
                    var name =$(goodsname[i]).text();
                    result.push(name);
                    var html = template('shopsearchlistTpl', {
                        result: result,
                        
                    });
                    $('.product-list').html(html);
                 }
                 
            }
            if(result.length==0){
                $('.product-list').html('商品为空');
             }
        }
    })
    $('body').on('input propertychange','#search' ,function () {
        var searchVal = $('#search').val().trim();
        if (searchVal.length==0) {
            queryshop(0,0); 
            console.log(1);
       
        }else{
            return;
        }
    })
    // 返回顶部
    $("#returntop").on('tap', function () {
        mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 1000); //100毫秒滚动到顶
    });

    $('#head').on('tap', function () {
        location = 'gsproduct.html';
    })

})