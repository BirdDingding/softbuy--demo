$(function () {
    
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    GetBrandTop10();
    GetBrandContent();
    GetBrandComment()
})

// 获取当前url指定参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    // if (r != null) return decodeURI(r[2]); 会存在中文乱码的问题
    if (r != null) return decodeURI(r[2]);
    return null;
}


// 十大品牌数据
function GetBrandTop10() {
    // 获取id值
    var brandId = this.GetQueryString('id');
    // 获取排行类型
    var brandtitle = this.GetQueryString('brandtitle');  
    // 截取字符串
    var length = brandtitle.length;
    brandtitle = brandtitle.substring(0, length-4);
    // 更改changename值
    $('.changename').text(brandtitle);
    // 如果没有传入id  默认id=0
    if (!brandId) {
        brandId = 0;
    }

    // 十大品牌列表
    $.ajax({
        url: "http://localhost:9090/api/getbrand",
        data: {
            brandtitleid: brandId
        },
        success: function (res) {
            var html = template('top10Tpl',res);
            $('.top10list').html(html);       
        }
    });
}

// 品牌详情
function GetBrandContent() {
    $.ajax({
        url: "http://localhost:9090/api/getbrandproductlist",
        data: {
            brandtitleid: this.GetQueryString('id'),
            pagesize: 4
        },
        success: function (res) {
            var html = template('top10ListTpl',res);
            $('.saleList').html(html);
            console.log(res);
            
        }
    });
}

// 评论部分
function GetBrandComment() {
    $.ajax({
        url: "http://localhost:9090/api/getbrandproductlist",
        data: {
            brandtitleid: this.GetQueryString('id'),
            pagesize: 5
        },
        success: function (res) {
            var html = template('contentTitleTpl', res);
            $('.contentTitle').html(html);
            console.log(res);

            var liList = $('.comContent li');
            liList.each(function (index,e) {
                var productid = $(this).data('productid');
                $.ajax({
                    url: "http://localhost:9090/api/getproductcom",
                    data: {
                        productid: productid
                    },
                    success: function (response) {
                        var comHtml = template('commentConTpl',response);
                        $('.comContent .comment').html(comHtml);
                    }
                });
            })
            
        }
    })
}