// 封装为一个函数
var heima = {
    tap:function(dom,callback){
        var st,startX,startY
        // 添加事件
        dom.addEventListener("touchstart",function(e){
            // 判断手指的数量
            if(e.targetTouches.length > 1){
                return
            }
            // 记录起始时间：尽量是毫秒数 Date.now()
            st = Date.now()
            // 记录手指的起始坐标
            startX = e.targetTouches[0].clientX
            startY = e.targetTouches[0].clientY
        })

        dom.addEventListener('touchend',function(e){
            // 1,判断时间间隔
            if(Date.now() - st > 200){
                return
            }
            // 重新获取手指坐标值
            var endX = e.changedTouches[0].clientX
            var endY = e.changedTouches[0].clientY
            // Math.abs:获取绝对值
            if(Math.abs(endX-startX) > 6 || Math.abs(endY-startY) > 6){
                return
            }
            // 执行操作
            callback && (typeof callback == 'function') && callback(e)
        })
    }
}