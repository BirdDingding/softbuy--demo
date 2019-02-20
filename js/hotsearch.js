$(function () {
    queryMoneyCtrl(1);
    mask();
    map();

    //   //天使跟你飞有bug
    //     $(document).on('tap', function (e) {
    //         e = e || window.event;

    //        console.log(e);
    //        var startX = e.detail.touches[0].pageX-$('#img').width()+$('#img').width() / 2 -$('#main').scrollTop()+ 'px';
    //        var startY = e.detail.touches[0].pageY-$('#img').height()-$('#img').height()/2 -$('#main').scrollLeft()+ 'px';

    //         $('#img').css('left', startX);
    //         $('#img').css('top', startY);

    //          console.log(startX);
    //         console.log(startY);
    //     })



    //视频
    $('.video').on('tap', function () {
        $('.backdrop-video').show();
        $('.mainnav').hide();
        $('.pasue').show();
        $('.pasue').on('tap', function () {
            $('.backdrop-video').hide();
            $('.pasue').hide();
            $('.mainnav').show();
        })
    })


    // 地图  
    $('.map').on('tap', function () {
        location = "../pages/地图.html";
    })

    // 地图  
    function map() {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.400244, 39.92556);
        map.centerAndZoom(point, 12);
        var marker = new BMap.Marker(point); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        marker.addEventListener("click", getAttr);

        function getAttr() {
            var p = marker.getPosition(); //获取marker的位置
            alert("marker的位置是" + p.lng + "," + p.lat);
        }

    }

    $('.money-bag').on('tap', function () {
         $('.backdrop-money').show();
          $('.bag').show();

    })

    $('.next').on('tap', function () {
        $('.backdrop-money').hide();
        $('.waning-money').show();
          $('.box').show();
         })
   
      $('.close').on('tap',function(){
        $('.waning-money').hide();
      })  
    //滚动条的插件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //分页的插件
    mui.init({
        swipeBack: true //启用右滑关闭功能
    });
    (function ($) {
        $('.mui-pagination').on('tap', 'a', function () {
            var li = this.parentNode;
            var classList = li.classList;
            if (!classList.contains('mui-active') && !classList.contains('mui-disabled')) {
                var active = li.parentNode.querySelector('.mui-active');
                if (classList.contains('mui-previous')) { //previous
                    if (active) {
                        var previous = active.previousElementSibling;
                        console.log('previous', previous);
                        if (previous && !previous.classList.contains('mui-previous')) {
                            $.trigger(previous.querySelector('a'), 'tap');
                        } else {
                            classList.add('mui-disabled');
                        }
                    }
                } else if (classList.contains('mui-next')) { //next
                    if (active) {
                        var next = active.nextElementSibling;
                        if (next && !next.classList.contains('mui-next')) {
                            $.trigger(next.querySelector('a'), 'tap');
                        } else {
                            classList.add('mui-disabled');
                        }
                    }
                } else { //page
                    active.classList.remove('mui-active');
                    classList.add('mui-active');
                    var page = parseInt(this.innerText);
                    console.log(page)
                    var previousPageElement = li.parentNode.querySelector('.mui-previous');
                    var nextPageElement = li.parentNode.querySelector('.mui-next');
                    previousPageElement.classList.remove('mui-disabled');
                    nextPageElement.classList.remove('mui-disabled');
                    if (page <= 1) {
                        previousPageElement.classList.add('mui-disabled');
                    } else if (page >= 5) {
                        nextPageElement.classList.add('mui-disabled');
                    }
                    queryMoneyCtrl(page);
                }
            }
        });
    })(mui);


    function queryMoneyCtrl(page) {
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: {
                pageid: page
            },
            success: function (data) {
                console.log(data);
                // var img = data.result[0].productImg2;

                // $(data.result).each(function () {

                //     var img = this.productImg2.split('"')[1];
                //     // console.log(img);
                //     this.productImg2 = img;
                // })

                var html = template('getmoneyctrl', data)
                $('#commodity').html(html);
            }
        })
    }



    //分页回到顶部滚动条的初始化
    $('.navpoint').on('tap', function () {
        mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100); //100毫秒滚动到顶
    })


    //遮罩盖 
    function mask() {
        $('#commodity').on('tap', '.img', function () {
            $('.backdrop-list').show();
            //轮播图初始化
            mui.init({
                swipeBack: true //启用右滑关闭功能
            });
            var slider = mui("#slider");
            document.getElementById("switch").addEventListener('toggle', function (e) {
                if (e.detail.isActive) {
                    slider.slider({
                        interval: 1000
                    });
                } else {
                    slider.slider({
                        interval: 0
                    });
                }
            });
        })

        $('.close').on('tap', function () {
            $('.backdrop-list').hide();
        })
    };



    mui.init({
        pullRefresh: {
            // 指定一个下拉刷新的容器 也是就是区域滚动的父容器
            container: '#pullrefresh',
            // down表示初始化下拉刷新
            down: {
                height: 50,
                contentdown: "你正在往下拉请继续拉", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "可以松手了", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在拼命加载中...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                // callback指的是下拉刷新的回调函数
                callback: pulldownRefresh
            },
            // up表示初始化上拉加载更多
            up: {
                contentrefresh: '正在拼命加载更多数据...',
                contentnomore: '在下实在给不了更多了!',
                callback: pullupRefresh
            }
        }
    });

    /**
     * 下拉刷新回调函数
     */
    function pulldownRefresh() {
        console.log('触发了一次下拉');
        // 回调给你用来刷新数据的  写ajax请求刷新数据 因为本地请求还是很快加一个定时器延迟一下
        setTimeout(function () {
            // 这些代码就相当于在刷新数据
            // 1. 发送ajax请求刷新数据 调用请求刷新数据的函数
            queryMoneyCtrl();
            // 结束下拉刷新的函数 当数据请求完毕了之后要结束下拉刷新转圈圈的效果 如果不调用结束就会一直转
            mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            // 注意官网文档结束下拉刷新的函数是旧版本的 新版本已经换成endPulldownToRefresh 注意使用demo文档里面的代码
            // mui('#pullrefresh').pullRefresh().endPulldown();
            // 而且特殊强调 重置代码一定要等到下拉刷新结束了之后才能重置 不然重置不了
            // 当下拉刷新完成后去重置上拉加载更多(因为如果上拉到底了就再也拉不了了 )
            mui('#pullrefresh').pullRefresh().refresh(true);
            // 还要把我们业务page重置为1  
            // page = 1;

        }, 1500);
    }
    var page = 1;
    /**
     * 上拉加载的回调函数
     */
    function pullupRefresh() {
        console.log('你触发了上拉');
        // 定时器为了模拟延迟 
        setTimeout(function () {
            // 1. 上拉加载是要加载更多数据 使用append追加
            // 2. 上拉加载更多数据 就是下一页数据
            $.ajax({
                url: 'http://localhost:9090/api/getmoneyctrl',
                data: {
                    pageid: page
                },
                success: function (data) {
                    var html = template('getmoneyctrl', data);
                    $('#commodity').html(html);
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                }
            });

        }, 1500);
    }

})
