$(function () {
    setHeight();

})
// 解决旋转至竖直后文字重叠问题
function setHeight() {
    var spanWidth = $(".scrollBox>#p1>span").width();
    $(".scrollBox>p").height(spanWidth);
}
// 确认输入+特殊字符翻转
function confirmbtn() {
    var context = $("#subtitleInp").val();
    $(".scrollBox p").empty();
    // 保持字体 保持颜色
    $(".scrollBox p").append('<span style="font-size:' + spanSize + ';color:' + spanColor + '">' + context + '</span>');
    // 保持间距
    setHeight();
    // 保持速度
    clearScrollTime();
}
// 监听回车
$('#subtitleInp').bind('keypress', function (event) { //回车事件绑定 
    if (event.keyCode == "13") { //js监测到为为回车事件时 触发
        event.preventDefault(); //阻止页面自动刷新，重复加载
        confirmbtn();
    }
});



// 无限滚动
var fox = $(".scrollBox")[0];
var p1 = $(".scrollBox>#p1")[0];
var p2 = $(".scrollBox>#p2")[0];
var speed = 10; //设置滚动速度
var timer = window.setInterval("moveTop()", speed); //设置定时器
function moveTop() {
    if (p2.offsetTop - fox.scrollTop <= 0) { //当滚动至p1与p2交界时
        fox.scrollTop -= p1.offsetHeight //父盒子跳到最顶端
    } else {
        fox.scrollTop++
    }
}
// 重设滚动定时器
function clearScrollTime() {
    var inputVal = $("#subtitleInp").val();
    if (inputVal == "" || inputVal == null) {
        clearInterval(timer)
    } else {
        clearInterval(timer)
        timer = setInterval(moveTop, speed)
    }
}



// 速度
function speedFun(el, value) {
    $(el).parent('p').children('span').removeClass("thisP");
    $(el).addClass("thisP");
    speed = value;
    clearScrollTime();
}

// 字号
var spanSize = '160px';

function fSizeFun(el, value) {
    $(el).parent('p').children('span').removeClass("thisP");
    $(el).addClass("thisP");

    spanSize = value;
    $(".scrollBox>p>span").css("font-size", spanSize);

    setHeight();
    clearScrollTime();
}

// 颜色
var spanColor = "#0CDAb2";

function colorFun(el, value) {
    $(el).parent('p').children('span').removeClass("thisP").removeClass("thisP2");

    spanColor = value;
    if (value == "#ffffff") {
        $(el).addClass("thisP2");
    } else {
        $(el).addClass("thisP");
    }

    $(".scrollBox>p>span").css("color", spanColor);
}



// 输入抽屉
// 展开关闭输入设置抽屉
var statusInpSet = true;

function hideSetBox(el) {
    if (statusInpSet == true) {
        drawerFun($(".setBox1"), 'close');
        $(".closeSet1 i").attr("class", "fa fa-chevron-right")
        statusInpSet = false;
        var colorTime = window.setTimeout(function () {
            $(el).animate({
                opacity: '.7'
            });
        }, 1000); //设置定时器

    } else {
        drawerFun($(".setBox1"), 'open');
        $(".closeSet1 i").attr("class", "fa fa-chevron-left")
        statusInpSet = true;
        $(el).animate({
            opacity: '1'
        });
    }
}
// 左侧抽屉方法
function drawerFun(el, value) {
    var width = '-' + ($(el).width() - 39) + 'px';
    if (value == "open") {
        $(el).css('left', '0')
    } else {
        $(el).css('left', width);
    }
}
// 点击空白处，隐藏/显示输入抽屉
$(".scrollBox").on('click', function () {
    hideSetBox($('.closeSet1'))
})
// 移动端兼容性写法 - touchstart：触摸开始的时候触发
// (问题：占用了滑动屏幕功能)
// var box = document.getElementsByClassName('scrollBox')[0];
// box.addEventListener('touchstart', function(event) {
//      // 如果这个元素的位置内只有一个手指的话
//      console.log(111)
//     if (event.targetTouches.length == 1) {
// 　　　　 event.preventDefault();// 阻止浏览器默认事件，重要 
//         hideSetBox($('.closeSet1'))
//         }
// }, false);



// 展开字号颜色抽屉
function setOpen() {
    $("#mask").show();
    drawerFun_ud($(".setBox2"), "open");
}
// 关闭字号颜色抽屉
function closeFun() {
    $("#mask").hide();
    drawerFun_ud($(".setBox2"), "close");
}
// 字号颜色抽屉方法
function drawerFun_ud(el, value) {
    var height = '-' + ($(el).height() + 20) + 'px';
    if (value == "open") {
        $(el).css('bottom', '0')
    } else {
        $(el).css('bottom', height);
    }
}


// 全屏功能
// 在支持全屏的浏览器中启动全屏
// 整个页面 // 某个元素
// launchFullScreen(document.documentElement);
// launchFullScreen(document.getElementById("videoElement"));
// 找到支持的方法, 使用需要全屏的 element 调用
// 进入全屏
function launchFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
// 退出 全屏
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozExitFullScreen) {
        document.mozExitFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// 全屏 进入/退出切换
var fullScreen = false;
$("#fullBtn").click(function () {
    if (fullScreen == false) {
        launchFullScreen(document.documentElement);
        fullScreen = true;
        $("#fullBtn").removeClass("fa fa-arrows-alt").addClass("fa fa-compress");
    } else {
        // 调用退出全屏方法!
        exitFullscreen();
        fullScreen = false;
        $("#fullBtn").removeClass("fa fa-compress").addClass("fa fa-arrows-alt");
    }
})