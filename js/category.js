$(function () {

    // window.addEventListener('touchmove', e => e.preventDefault())
    // 实现动态渲染模板
    // 1.1调用分类商品API
    // 1.2获取分类标题
    $.ajax({
        url: "http://localhost:9090/api/getcategorytitle",
        success: function (data) {
            var html = template('categoryTitleTpl', data);
            // 把生成的html放到ul里面
            $('#category .title').html(html);
        }
    });


    // 2.2点击a标签获取商品内容数据(事件委托)
    $('#category .title').on('tap', 'li a', function () {
        // 获取id
        var id = $(this).data('id');
        // 1.当我们重复点击一个a展开数据时
        // 2.如果我们重复展开多个数据
        // 3.显示当前模块下的商品分类
        if ($('.product').hasClass('active')) {
            $(this).siblings('ul').removeClass('active');
            $(this).children('i').removeClass('fa-angle-up').addClass('fa-angle-down');
        } else {
            $(this).siblings('ul').addClass('active');
            $(this).children('i').removeClass('fa-angle-down').addClass('fa-angle-up');
        }

        // 给当前对象添加标识
        // $(this).addClass('active');
        // 定义变量存储当前点击的对象
        var that = $(this);
        // 2.1调用商品内容API
        $.ajax({
            url: 'http://localhost:9090/api/getcategory',
            data: {
                titleid: id
            },
            success: function (data) {
                var html = template('categorySecondTpl', data);
                // 把生成的html放到ul里面
                // 将生成的ul存放在当前点击的a标签的兄弟元素里
                // 判断自己点击的是哪一个， 根据id去渲染相应的分类内容，但是有一个很大的问题
                // 渲染的位置放错了，由于重新渲染内容，会将原来的内容覆盖   
                // $('.title .product').html(html);
                // title下面的被点击的a标签的product
                // 将内容添加到当前点击对象的ul中
                // if (that.children('i').hasClass('fa-angle-down')) {
                //     that.children('i').removeClass('fa-angle-down').addClass('fa-angle-up');
                // } else {
                //     that.children('i').removeClass('fa-angle-up').addClass('fa-angle-down');
                //     that.siblings('ul').html(html).addClass('active');
                //     // that.siblings('ul').removeClass('active');
                // }
                // if($(this).children('i').hasClass('fa-angle-up')){
                //     that.siblings('ul').html(html).removeClass('active');
                // }else {

                that.children('i').removeClass('fa-angle-down').addClass('fa-angle-up').parent().siblings('ul').addClass('active').html(html).parent().siblings('li').children('ul').removeClass('active').siblings('a').children('i').removeClass('fa-angle-up').addClass('fa-angle-down').parent().siblings('ul').html(html);

                // $('.product').html(html);

                // that.siblings('ul').removeClass('active');
                // }
            }
        });

    });

    function index(){
        location = '../index.html';
    }
})