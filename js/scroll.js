$(".scrollBox").on('click',function(){
    hideSetBox($('.closeSet1'))
})

// 输入抽屉
// 展开关闭输入设置抽屉
var statusSet1 = true;
function hideSetBox(el) {
    if (statusSet1 == true) {
        drawerFun($(".setBox1"), 'close');
        $(".closeSet1 i").attr("class", "fa fa-chevron-right")
        statusSet1 = false;
        var colorTime = window.setTimeout(function(){
            $(el).animate({opacity:'.7'});
        }, 1000); //设置定时器
        
    } else {
        drawerFun($(".setBox1"), 'open');
        $(".closeSet1 i").attr("class", "fa fa-chevron-left")
        statusSet1 = true;
        $(el).animate({opacity:'1'});
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


// 字号颜色抽屉
// 展开详细设置抽屉
function setOpen() {
    $("#mask").show();
    drawerFun_ud($(".setBox2"), "open");
}
// 关闭底部抽屉
function closeFun() {
    $("#mask").hide();
    drawerFun_ud($(".setBox2"), "close");
}
// 底部抽屉方法
function drawerFun_ud(el, value) {
    var height = '-' + ($(el).height() + 20) + 'px';
    if (value == "open") {
        $(el).css('bottom', '0')
    } else {
        $(el).css('bottom', height);
    }
}



// 确认输入+特殊字符翻转
function confirmbtn() {
    var context = $("#subtitleInp").val();
    $(".scrollBox p").empty();
    var reg = new RegExp("[\\u4E00-\\u9FA5]+");
    //  //匹配这些中文标点符号 [>this  。 ？ ！ ， 、 ； ：  this<]7num   “ ”  ‘ ’  ' （ ） 《 》 〈 〉 【 】 『 』 「 」  [>this   ﹃ ﹄  this<]2num    〔 〕 … — ～ ﹏  [>this  ￥ this<]1num
    // // var reg2 = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
    // ￣ FFE3
    var reg3 = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\ufe43|\ufe44|\uffe5|\uFFE3]/;
    for (let i = 0; i < context.length; i++) {
        if (reg.test(context[i]) || reg3.test(context[i])) {
            // if (reg.test(context[i])) {
            $(".scrollBox p").append('<span class="chineseW">' + context[i] + '</span>')
        } else {
            $(".scrollBox p").append('<span>' + context[i] + '</span>')
        }
    }
    clearInterval(time)
    time = setInterval(moveTop, speed)
}


// 无限滚动
var fox = $(".scrollBox")[0];
var p1 = $(".scrollBox>#p1")[0];
var p2 = $(".scrollBox>#p2")[0];
var speed = 10; //设置滚动速度
var time = window.setInterval("moveTop()", speed); //设置定时器
function moveTop() {
    if (p2.offsetTop - fox.scrollTop <= 0) //当滚动至p1与p2交界时
        fox.scrollTop -= p1.offsetHeight //父盒子跳到最顶端
    else {
        fox.scrollTop++
    }
}
//鼠标移上时清除定时器达到滚动停止的目的
//鼠标移开时重设定时器，继续滚动
// $(".scrollBox").hover(function () {
//     clearInterval(time)
// }, function () {
//     time = setInterval(moveTop, speed)
// });


// 速度
function speedFun(el, value) {
    $(el).parent('p').children('span').removeClass("thisP");
    $(el).addClass("thisP");
    if(value=="slow"){
        speed = 15;
    }else if(value=="normal"){
        speed = 10;
    }else{
        speed = 5;
    }
    clearInterval(time)
    time = setInterval(moveTop, speed)
}

// 字号
function fSizeFun(el, value) {
    $(el).parent('p').children('span').removeClass("thisP");
    $(el).addClass("thisP");
    if (value == 'small') {
        $(".scrollBox>p>span").css("font-size", "120px");
    } else if (value == 'medium') {
        $(".scrollBox>p>span").css("font-size", "160px");
    } else if (value == 'large') {
        $(".scrollBox>p>span").css("font-size", "200px");
    } else if (value == 'extraLarge') {
        $(".scrollBox>p>span").css("font-size", "240px");
    }
}

// 颜色
function colorFun(el, value) {
    $(el).parent('p').children('span').removeClass("thisP").removeClass("thisP2");
    if (value == "#ffffff") {
        $(el).addClass("thisP2");
    } else {
        $(el).addClass("thisP");
    }
    $(".scrollBox>p").css("color", value);
}