$(function(){
    yhsfcz();
    grzxtxx(); 
    wokesAll();  
    grzlws();
    // $(".content-grzl").hide();
});

var allcookies = document.cookie;
function getCookie(cookie_name)
{
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度

    // 如果找到了索引，就代表cookie存在，
    // 反之，就说明不存在。
    if (cookie_pos != -1)
    {
        // 把cookie_pos放在值的开始，只要给值加1即可。
        cookie_pos += cookie_name.length + 1;      //这里容易出问题，所以请大家参考的时候自己好好研究一下
        var cookie_end = allcookies.indexOf(";", cookie_pos);

        if (cookie_end == -1)
        {
            cookie_end = allcookies.length;
        }

        var value = unescape(allcookies.substring(cookie_pos, cookie_end));         //这里就可以得到你想要的cookie的值了。。。
    }
    return value;
}
var userid=getCookie("userid");

//创作中心验证用户是否登录获取相关信息
function yhsfcz(){
    //alert(userid)
    // userid=123;
    if (userid==undefined||userid==null||userid=="") {
        $('.zc').show();
    } else {
        $('.zc').hide();
        $('.txlg').show();
        $('#czzx-wdl').hide();
        $('#czzx-ydl').show();
        $.ajax({
            type:'get',
            url:'../js/grtxxx.json',
            cache:false,
            async:false,
            data:{
                userid:userid
            }
        }).done(function(data){ //返回当前用户的头像地址，昵称和签名
            console.log(data.content);
            var grxx= data.content[0];
            $("#txlg-img").attr("src",grxx.tpdz);
            $("#grzx-tx").attr("src",grxx.tpdz);
            $("#grtx-nc").text(grxx.nc);
            $("#grtx-qm").text(grxx.qm);
        })
    }
}

if (typeof FileReader == 'undefined') {
    document.getElementById("xmTanDiv").InnerHTML = "<h1>当前浏览器不支持FileReader接口</h1>";
    document.getElementById("xdaTanFileImg").setAttribute("disabled", "disabled");
}
//选择图片，马上预览
function xmTanUploadImg(obj) {
  var file = obj.files[0];               
  console.log("*********");console.log(file);
  console.log("file.size = " + file.size);
  var reader = new FileReader();
  reader.onloadstart = function (e) {
     console.log("开始读取....");
 }
 reader.onprogress = function (e) {
     console.log("正在读取中....");
 }
 reader.onabort = function (e) {
     console.log("中断读取....");
 }
 reader.onerror = function (e) {
  console.log("读取异常....");
}
reader.onload = function (e) {
  console.log("成功读取....");
  var img = document.getElementById("avarimgs");
  img.src = e.target.result;
   //或者 img.src = this.result;  //e.target == this
}
reader.readAsDataURL(file)
}

//个人中心判断是否新注册用户
function grzlws(){
 var thisURL = document.URL;      
  var showval= thisURL.split("=")[1]; // alert(showval)
  if (showval==0) {
    $('#grzp').removeClass("cur");
    $('#grzl').addClass("cur");
    $('.zpfbqk').hide();
    $('.content-zp').empty();
    $('.content-grzl').show();
    $('#pages').empty();
    $('#jczl-xs').hide();
    $('#jczl-xg').show();
    grzlxs();
} else {
    wokesYfb('.content-zp');
}
}

//个人中心头展示信息
function grzxtxx(){
    $.ajax({
        type:'get',
        url:'../js/grtxxx.json',
        cache:false,
        async:false,
        data:userid
    }).done(function(data){//人气、积分、粉丝、点赞、头像地址、昵称、签名
        console.log(data.content[0]);
        var grxx= data.content[0];
        $("#grtx-rq").text(grxx.rq);
        $("#grtx-jf").text(grxx.jf);
        $("#grtx-fs").text(grxx.fs);
        $("#grtx-dz").text(grxx.dz);
        $("#grtx-nc").text(grxx.nc);
        $("#grtx-qm").text(grxx.qm);
        $("#grtx-tx").attr("src",grxx.tpdz);
        $("#avarimgs").attr("src",grxx.tpdz);
        $("#txlg-img").attr("src",grxx.tpdz);

        // $("#jczlxs-nc").attr("value", grxx.nc);

    })
}

//所有作品展示接口（发布的作品）
function wokesAll(){
    var data={
        pagesize:20,
        page:1
    }
    $.ajax({
        type:'get',
        url:'../js/works.json',
        cache:false,
        async:false,
        data:data
    }).done(function(data){ //作品id、作品名称、作品图片地址、发布时间、作者、作品查看量、收藏量、点赞量
        console.log(data.content);
        $('#all').empty();
        if (data.content==null||data.content=="") {
            var cw ='<div class="cwts"><img src="../images/404.png"><p>哎呀！一不小心跑丢了～</p></div>'
            $('#all').append(cw);
        } else {
            $.each(data.content,function(index,item){
                worksZs(item);
            })
            $('#pages').empty();
            pages('qbzp-page','../js/works.json',data.total);
        }
    })

}

//分页工具
function pages(pageid,url,total){

    $('#pages').append('<div class="box" id="'+pageid+'"></div>');

    var pagesize=20;
    var onPagechange = function(page){
        console.log('当前点击页码',page);
        var data={
            pagesize:pagesize,
            page:page
        }
        $.ajax({
            type:'get',
            url:url,
            cache:false,
            async:false,
            data:data
                }).done(function(data){//作品id、作品名称、作品图片地址、发布时间、作者、作品查看量、收藏量、点赞量
                    console.log(data.content);
                    $('#all').empty();
                    $.each(data.content,function(index,item){
                        worksZs(item);
                    })
                })
            }
            var obj = {
                wrapid:pageid, //页面显示分页器容器id
                total:total,//总条数
                pagesize:pagesize,//每页显示10条
                currentPage:1,//当前页
                onPagechange:onPagechange,
                btnCount:5 //页数过多时，显示省略号的边界页码按钮数量，可省略，且值是大于5的奇数
            }
            pagination.init(obj);
        }

//精选作品接口
function wokesJx(){
    var data={
        pagesize:20,
        page:1
    }
    $.ajax({
        type:'get',
        url:'../js/works.json',
        cache:false,
        async:false,
        data:data
    }).done(function(data){ //作品id、作品名称、作品图片地址、发布时间、作者、作品查看量、收藏量、点赞量
        console.log(data.content);
        if (data.content==null||data.content=="") {
            var cw ='<div class="cwts"><img src="../images/404.png"><p>哎呀！一不小心跑丢了～</p></div>'
            $('#all').append(cw);
        } else {
            $.each(data.content,function(index,item){
                worksZs(item);
            })
            $('#pages').empty();
            pages('jxzp-page','../js/works.json',data.total);

        }
    })

}

//热门作品
function wokesRm(){
    var data={
        pagesize:20,
        page:1
    }
    $.ajax({
        type:'get',
        url:'../js/works-wd.json',
        cache:false,
        async:false,
        data:data
    }).done(function(data){//作品id、作品名称、作品图片地址、发布时间、作者、作品查看量、收藏量、点赞量
        console.log(data.content);
        if (data.content==null||data.content=="") {
            var cw ='<div class="cwts"><img src="../images/404.png"><p>哎呀！一不小心跑丢了～</p></div>'
            $('#all').append(cw);
        } else {
            $.each(data.content,function(index,item){
                worksZs(item);
            })
            $('#pages').empty();
            pages('rmzp-page','../js/works.json',data.total);

        }
    })

}
//我的作品
function wokesWd(){
    var user="aa";
    if (userid==undefined||userid==null||userid=="") {
        var cw ='<div class="cwts cwts-ts"><img src="../images/404.png"><p>您还未登录喔～</p><button class="wd-dl" id="wd-dl">登录</button></div>'
        $('#all').append(cw);
        $("#wd-dl").click(function(){
            $('#zhzcdl').show();
            $('.header').hide();
            tpyz('tpyz-zcxs','tpyz-zcts');
            tpyz('tpyz-dlxs','tpyz-dlts');
        })
    } else {
       $('#czxx-wdzp').show();
       wokesYfb('#all');
   }

}

function worksZs(item){
    var zp="";
    zp+="<div class='row-zpzs'>";
    zp+="<div class='pricing-item'>";
    zp+="<img src='"+item.tpdz+"' class='img-work'>";
    zp+="<div class='pricing-content'>";
    zp+="<p class='work-title'>"+item.name+"</p>";
    zp+="<p class='work-time'>"+item.fbsj+"</p>";
    zp+="<p class='work-con'>";
    zp+="<span><img class='work-img' src='../images/look.png'>"+item.ckl+"</span>";
    zp+="<span><img class='work-img' src='../images/cang.png'>"+item.scl+"</span>";
    zp+="<span><img class='work-img' src='../images/zan.png'>"+item.dzl+"</span>";
    zp+="</p><p class='work-btm'>&nbsp</p></div></div></div>";

    $('#all').append(zp);
}

//我的已发布作品
function wokesYfb(cs){
    $(cs).empty();
    var pagesize=20;
    var data={
        pagesize:pagesize,
        page:1
    }
    var url='../js/works.json';
    $.ajax({
        type:'get',
        url:url,
        cache:false,
        async:false,
        data:data
    }).done(function(data){//作品id、作品名称、作品图片地址、发布时间、作者、作品查看量、收藏量、点赞量
        console.log(data.content);
        if (data.content==null||data.content=="") {
            var cw ='<div class="cwts"><p>暂无作品～</p></div>'
            $(cs).append(cw);
        } else {
            $.each(data.content,function(index,item){

                var zp="";
                zp+="<div class='row-zpzs'>";
                zp+="<div class='pricing-item'>";
                zp+="<img src='"+item.tpdz+"' class='img-work'><div class='work-xg'><a href='#' id='fbzp-bj'>编辑</a><a href='#' id='fbzp-xz'>下线</a><a href='#' id='fbzp-sc'>删除</a></div>";
                zp+="<div class='pricing-content'>";
                zp+="<p class='work-title'>"+item.name+"</p>";
                zp+="<p class='work-time'>"+item.fbsj+"</p>";
                zp+="<p class='work-con'>";
                zp+="<span><img class='work-img' src='../images/look.png'>"+item.ckl+"</span>";
                zp+="<span><img class='work-img' src='../images/cang.png'>"+item.scl+"</span>";
                zp+="<span><img class='work-img' src='../images/zan.png'>"+item.dzl+"</span>";
                zp+="</p><p class='work-btm'>&nbsp</p></div></div></div>";

                $(cs).append(zp);
            })
            $('#pages').empty();
            // pages('yfzp-page','../js/works.json',data.total);
            $('#pages').append('<div class="box" id="yfb-page"></div>');

            var onPagechange = function(page){
                console.log('当前点击页码',page);
                var data={
                    pagesize:pagesize,
                    page:page
                }
                $.ajax({
                    type:'get',
                    url:url,
                    cache:false,
                    async:false,
                    data:data
                }).done(function(data){//作品id、作品名称、作品图片地址、发布时间、作者、作品查看量、收藏量、点赞量
                    console.log(data.content);
                    $(cs).empty();
                    $.each(data.content,function(index,item){

                        var zp="";
                        zp+="<div class='row-zpzs'>";
                        zp+="<div class='pricing-item'>";
                        zp+="<img src='"+item.tpdz+"' class='img-work'><div class='work-xg'><a href='#' id='fbzp-bj'>编辑</a><a href='#' id='fbzp-xz'>下线</a><a href='#' id='fbzp-sc'>删除</a></div>";
                        zp+="<div class='pricing-content'>";
                        zp+="<p class='work-title'>"+item.name+"</p>";
                        zp+="<p class='work-time'>"+item.fbsj+"</p>";
                        zp+="<p class='work-con'>";
                        zp+="<span><img class='work-img' src='../images/look.png'>"+item.ckl+"</span>";
                        zp+="<span><img class='work-img' src='../images/cang.png'>"+item.scl+"</span>";
                        zp+="<span><img class='work-img' src='../images/zan.png'>"+item.dzl+"</span>";
                        zp+="</p><p class='work-btm'>&nbsp</p></div></div></div>";

                        $(cs).append(zp);
                    })
                })
            }
            var obj = {
                wrapid:'yfb-page', //页面显示分页器容器id
                total:data.total,//总条数
                pagesize:pagesize,//每页显示10条
                currentPage:1,//当前页
                onPagechange:onPagechange,
                btnCount:5 //页数过多时，显示省略号的边界页码按钮数量，可省略，且值是大于5的奇数
            }
            pagination.init(obj);
        }
    })
}

//个人未发布作品
function wokesWfb(cs){
    var pagesize=20;
    var data={
        pagesize:pagesize,
        page:1
    }
    var url='../js/works.json';
    $.ajax({
        type:'get',
        url:url,
        cache:false,
        async:false,
        data:data
    }).done(function(data){//作品id、作品名称、作品图片地址、修改时间、作者
        console.log(data.content);
        if (data.content==null||data.content=="") {
            var cw ='<div class="cwts"><p>暂无作品～</p></div>'
            $(cs).append(cw);
        } else {
            $.each(data.content,function(index,item){

                var zp="";
                zp+="<div class='row-zpzs'>";
                zp+="<div class='pricing-item'>";
                zp+="<img src='"+item.tpdz+"' class='img-work'><div class='work-xg'><a href='#' id='fbzp-bj'>发布</a><a href='#' id='fbzp-xz'>编辑</a><a href='#' id='fbzp-sc'>删除</a></div>";
                zp+="<div class='pricing-content'>";
                zp+="<p class='work-title'>"+item.name+"</p>";
                zp+="<p class='work-time'>"+item.fbsj+"</p><p class='work-btm'>&nbsp</p></div></div></div>";

                $(cs).append(zp);
            })
            $('#pages').empty();
            $('#pages').append('<div class="box" id="wfb-page"></div>');

            var onPagechange = function(page){
                console.log('当前点击页码',page);
                var data={
                    pagesize:pagesize,
                    page:page
                }
                $.ajax({
                    type:'get',
                    url:url,
                    cache:false,
                    async:false,
                    data:data
                }).done(function(data){//作品id、作品名称、作品图片地址、发布时间、作者、作品查看量、收藏量、点赞量
                    console.log(data.content);
                    $(cs).empty();
                    $.each(data.content,function(index,item){

                        var zp="";
                        zp+="<div class='row-zpzs'>";
                        zp+="<div class='pricing-item'>";
                        zp+="<img src='"+item.tpdz+"' class='img-work'><div class='work-xg'><a href='#' id='fbzp-bj'>发布</a><a href='#' id='fbzp-xz'>编辑</a><a href='#' id='fbzp-sc'>删除</a></div>";
                        zp+="<div class='pricing-content'>";
                        zp+="<p class='work-title'>"+item.name+"</p>";
                        zp+="<p class='work-time'>"+item.fbsj+"</p><p class='work-btm'>&nbsp</p></div></div></div>";

                        $(cs).append(zp);
                    })
                })
            }
            var obj = {
                wrapid:'wfb-page', //页面显示分页器容器id
                total:data.total,//总条数
                pagesize:pagesize,//每页显示10条
                currentPage:1,//当前页
                onPagechange:onPagechange,
                btnCount:5 //页数过多时，显示省略号的边界页码按钮数量，可省略，且值是大于5的奇数
            }
            pagination.init(obj);
        }
    })
}

//个人收藏作品
function wokesSczp(){
    var pagesize=20;
    var data={
        pagesize:pagesize,
        page:1
    }
    var url='../js/works.json';
    $.ajax({
        type:'get',
        url:url,
        cache:false,
        async:false,
        data:data
    }).done(function(data){//作品id、作品名称、作品图片地址、发布时间、作者、作品查看量、收藏量、点赞量
        console.log(data.content);
        if (data.content==null||data.content=="") {
            var cw ='<div class="cwts"><p>暂无收藏～</p></div>'
            $('.content-zp').append(cw);
        } else {
            $.each(data.content,function(index,item){

                var zp="";
                zp+="<div class='row-zpzs'>";
                zp+="<div class='pricing-item'>";
                zp+="<img src='"+item.tpdz+"' class='img-work'><div class='work-xg'><a href='#' id='fbzp-xz'>编辑</a><a href='#' id='fbzp-sc'>删除</a></div>";
                zp+="<div class='pricing-content'>";
                zp+="<p class='work-title'>"+item.name+"</p>";
                zp+="<p class='work-time'>"+item.fbsj+"</p>";
                zp+="<p class='work-con'>";
                zp+="<span><img class='work-img' src='../images/look.png'>"+item.ckl+"</span>";
                zp+="<span><img class='work-img' src='../images/cang.png'>"+item.scl+"</span>";
                zp+="<span><img class='work-img' src='../images/zan.png'>"+item.dzl+"</span>";
                zp+="</p><p class='work-btm'>&nbsp</p></div></div></div>";

                $('.content-zp').append(zp);
            })
            $('#pages').empty();
            $('#pages').append('<div class="box" id="wdsc-page"></div>');

            var onPagechange = function(page){
                console.log('当前点击页码',page);
                var data={
                    pagesize:pagesize,
                    page:page
                }
                $.ajax({
                    type:'get',
                    url:url,
                    cache:false,
                    async:false,
                    data:data
                }).done(function(data){//作品id、作品名称、作品图片地址、发布时间、作者、作品查看量、收藏量、点赞量
                    console.log(data.content);
                    $('.content-zp').empty();
                    $.each(data.content,function(index,item){

                        var zp="";
                        zp+="<div class='row-zpzs'>";
                        zp+="<div class='pricing-item'>";
                        zp+="<img src='"+item.tpdz+"' class='img-work'><div class='work-xg'><a href='#' id='fbzp-xz'>编辑</a><a href='#' id='fbzp-sc'>删除</a></div>";
                        zp+="<div class='pricing-content'>";
                        zp+="<p class='work-title'>"+item.name+"</p>";
                        zp+="<p class='work-time'>"+item.fbsj+"</p>";
                        zp+="<p class='work-con'>";
                        zp+="<span><img class='work-img' src='../images/look.png'>"+item.ckl+"</span>";
                        zp+="<span><img class='work-img' src='../images/cang.png'>"+item.scl+"</span>";
                        zp+="<span><img class='work-img' src='../images/zan.png'>"+item.dzl+"</span>";
                        zp+="</p><p class='work-btm'>&nbsp</p></div></div></div>";

                        $('.content-zp').append(zp);
                    })
                })
            }
            var obj = {
                wrapid:'wdsc-page', //页面显示分页器容器id
                total:data.total,//总条数
                pagesize:pagesize,//每页显示10条
                currentPage:1,//当前页
                onPagechange:onPagechange,
                btnCount:5 //页数过多时，显示省略号的边界页码按钮数量，可省略，且值是大于5的奇数
            }
            pagination.init(obj);
        }
    })
}

//个人中心基本信息
function zlxgfz(){

    var sq=$("#jczlxs-sq").val();
    var qx=$("#jczlxs-qx").val();
        // var n=$("#jczlxs-bcn").val();
        // var y=$("#jczlxs-bcy").val();

        $("#jbsjxx-nc").attr("value", $("#jczlxs-nc").val());
        $("#jbsjxx-xm").attr("value", $("#jczlxs-xm").val());
        $("#jbsjxx-csrq").attr("value", $("#jczlxs-csrq").val());
        $("#jbsjxx-xb").attr("value", $("#jczlxs-xb").val());
        $("#jbsjxx-sf").attr("value", $("#jczlxs-sf").val());
        $("#jbsjxx-sq").attr("value", $("#jczlxs-sq").val());
        $("#jbsjxx-qx").attr("value", $("#jczlxs-qx").val());
        $("#jbsjxx-xx").attr("value", $("#jczlxs-xuex").val());
        $("#jbsjxx-qm").attr("value", $("#jczlxs-qm").val());
        $("#sex").val($("#jczlxs-xb").val());
        $("#province").val($("#jczlxs-sf").val());//alert($("#jczlxs-sq").val())
        // $("#city").empty();
        $("#city").append("<option value='"+sq+"'>"+sq+"</option>"); 
        $("#city").val($("#jczlxs-sq").val());
        // $("#county").empty();
        $("#county").append("<option value='"+qx+"'>"+qx+"</option>"); 
        $("#county").val($("#jczlxs-qx").val());
        $("#jbsjxx-nj").val($("#jczlxs-nj").val());

        // $("#jbsjxx-bcn").append("<option value='"+n+"'>"+n+"</option>"); 
        // $("#jbsjxx-bcy").append("<option value='"+y+"'>"+y+"</option>"); 

        $("#jbsjxx-bcn").val($("#jczlxs-bcn").val());
        $("#jbsjxx-bcy").val($("#jczlxs-bcy").val());
//          $('select').find('option').eq(一年级).attr("selected","selected");
// $("#jczlxs-nj").find("option[text='一年级']").attr("selected",true); 
}


function grzlxs(){
    $.ajax({
        type:'get',
        url:'../js/grxx.json',
        cache:false,
        async:false,
        data:''
    }).done(function(data){
        console.log(data.content[0]);
        var grxx= data.content[0];
        $("#jczlxs-nc").attr("value", grxx.nc);
        $("#jczlxs-xm").attr("value", grxx.xm);
        $("#jczlxs-csrq").attr("value", grxx.sr);
        $("#jczlxs-xb").attr("value", grxx.xb);
        $("#jczlxs-sf").attr("value", grxx.sf);
        $("#jczlxs-sq").attr("value", grxx.sq);
        $("#jczlxs-qx").attr("value", grxx.qx);
        $("#jczlxs-xxxs").attr("value", grxx.xx+"   "+grxx.nj);
        $("#jczlxs-xuex").attr("value", grxx.xx);
        $("#jczlxs-nj").attr("value", grxx.nj);
        $("#jczlxs-qm").attr("value", grxx.qm);
        $("#jczlxs-bcn").attr("value", grxx.bcn);
        $("#jczlxs-bcy").attr("value", grxx.bcy);
        $("#aq-cysj").attr("value", grxx.sj);
        $("#aq-wx").attr("value", grxx.wx);
        $("#aq-qq").attr("value", grxx.qq);
        $("#aq-wb").attr("value", grxx.wb);
        $("#aq-mm").attr("value", grxx.mm);

        if (grxx.sj==null||grxx.sj=='') {
            $(".bdsj-sjh").html("立即绑定");
            $('.bdsj-sjh').addClass("aq-ljbd");
            $(".bdsj-sjh").attr("id", "bd-sjh");
        } else {
            $(".bdsj-sjh").html("更换");
            $('.bdsj-sjh').removeClass("aq-ljbd");
            $(".bdsj-sjh").attr("id", "gh-sjh");
        }
        if (grxx.wx==null||grxx.wx=='') {
            $(".wxh").html("立即绑定");
            $('.wxh').addClass("aq-ljbd");
            $(".wxh").attr("id", "bd-wxh");
        } else {
            $(".wxh").html("更换");
            $('.wxh').removeClass("aq-ljbd");
            $(".wxh").attr("id", "gh-wxh");
        }
        if (grxx.qq==null||grxx.qq=='') {
            $(".qqh").html("立即绑定");
            $('.qqh').addClass("aq-ljbd");
            $(".qqh").attr("id", "bd-qqh");
        } else {
            $(".qqh").html("更换");
            $('.qqh').removeClass("aq-ljbd");
            $(".qqh").attr("id", "gh-qqh");
        }
        if (grxx.wb==null||grxx.wb=='') {
            $(".wbh").html("立即绑定");
            $('.wbh').addClass("aq-ljbd");
            $(".wbh").attr("id", "bd-wbh");
        } else {
            $(".wbh").html("更换");
            $('.wbh').removeClass("aq-ljbd");
            $(".wbh").attr("id", "gh-wbh");
        }
        if (grxx.mm==null||grxx.mm=='') {
            $(".zhmm").html("设置密码");
            $('.zhmm').addClass("aq-ljbd");
            $(".zhmm").attr("id", "sz-zhmm");
        } else {
            $(".zhmm").html("修改");
            $('.zhmm').removeClass("aq-ljbd");
            $(".zhmm").attr("id", "xg-zhmm");
        }
        //
        var sjh=$(".bdsj-sjh").attr("id");
        var wxh=$(".wxh").attr("id");
        var qqh=$(".qqh").attr("id");
        var wbh=$(".wbh").attr("id");
        var zhmm=$(".zhmm").attr("id");
        $("#"+sjh).click(function(){
            if (sjh=='bd-sjh') {
                $('#bd-sjhbd').show();
                $(".header").hide();
            } else {
                $('#ggxjh').show();
                $(".header").hide();
            }
        }) 
        //更换微信好
        $("#"+wxh).click(function(){
            // if (wxh=='bd-wxh') {
            //     $('.header').hide();
            //     $('#bdwxh').show();
            // } else {
            //     $('.header').hide();
            //     $('#ghwxh').show();
            // }
        }) 
        $("#"+qqh).click(function(){
            if (qqh=='bd-qqh') {

            } else {
                $('.header').hide();
                $('#ghwxh').show();
            }
        }) 
        $("#"+wbh).click(function(){
            if (wbh=='bd-wbh') {

            } else {
                $('.header').hide();
                $('#ghwxh').show();
            }
        }) 
        $("#"+zhmm).click(function(){
            if (zhmm=='bd-zhmm') {

            } else {
                userid='3423424';
                $("#dlmm-zh").attr("value", userid);
                $('.header').hide();
                $('#dlmm-wj').hide();    
                $('#dlmmgh').show();

            }
        }) 

    })
}

function grjbzlxs(){
    $.ajax({
        type:'get',
        url:'../js/grxx.json',
        cache:false,
        async:false,
        data:''
    }).done(function(data){
        console.log(data.content[0]);
        var grxx= data.content[0];
        $("#jczlxs-nc").attr("value", grxx.nc);
        $("#jczlxs-xm").attr("value", grxx.xm);
        $("#jczlxs-csrq").attr("value", grxx.sr);
        $("#jczlxs-xb").attr("value", grxx.xb);
        $("#jczlxs-sf").attr("value", grxx.sf);
        $("#jczlxs-sq").attr("value", grxx.sq);
        $("#jczlxs-qx").attr("value", grxx.qx);
        $("#jczlxs-xxxs").attr("value", grxx.xx+"   "+grxx.nj);
        $("#jczlxs-xuex").attr("value", grxx.xx);
        $("#jczlxs-nj").attr("value", grxx.nj);
        $("#jczlxs-qm").attr("value", grxx.qm);
        $("#jczlxs-bcn").attr("value", grxx.bcn);
        $("#jczlxs-bcy").attr("value", grxx.bcy);

    })  
}

//验证手机号格式
function yzsjh(id,tsid){
    var theinput=$(id).val();
    console.log(theinput)
    var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/;
         //(p1.test(theinput));
    if(p1.test(theinput)==false) { // console.log(0)
        $(tsid).attr("value", "请输入正确的手机号码！");
    } else {//console.log(1)
        $(tsid).attr("value", "");      
        // document.getElementById("sjhts").value="";
    }
}
//验证码
function jbsjyzm(dhid,yzmid,tsid,btnid,cssbtn){
    var tel=$(dhid).val();
    var yzm=$(yzmid).val();//console.log(tel+yzm)
    var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/;
         //(p1.test(theinput));
         if (tel==null||tel=='') {
            $(tsid).attr("value", "手机号码不能为空！");
        } else {
            if(p1.test(tel)==false) {  
                $(tsid).attr("value", "请输入正确的手机号码！");
        } else {//console.log(1)
            $(tsid).attr("value", "");      
            // document.getElementById("sjhts").value="";
            if (yzm.length==6) {
                $(cssbtn).attr('id',btnid.substring(1));
                $(btnid ).click( function(){
                    var tel=$(dhid).val();
                    var yzm=$(yzmid).val();
                    jbsjh(tsid,tel,yzm,btnid);

                }) 
            } else{
                $(cssbtn).attr('id','');
            }
        }
    }
    
}
//手机号解绑、新绑
function jbsjh(id,tel,yzm,btnid){
    if (id=='#ysjhts') {
        $.ajax({
            type:'get',
            url:'../js/works.json',//验证成功删除旧手机号
            cache:false,
            async:false,
            data:{
                jbsj:tel,
                jbyzm:yzm
            }
        }).done(function(data){//返回验证结果
            console.log(data.content);//验证成功下一步
            if (true) { //后台判断手机号验证是否成功
                $(".one").removeClass("sjhxg-con-xz");
                $(".one div").removeClass("sjhxg-con-xz1");
                $(".two").addClass("sjhxg-con-xz");
                $(".two div").addClass("sjhxg-con-xz1");
                $("#jcsjbd").hide();
                $("#bdxsj").show();
                $(btnid).attr('id','');
            } else {
                $(id).attr("value", "手机号或验证码不正确！");
            }
        }) 
    } else {
        $.ajax({
            type:'get',
            url:'../js/works.json',//验证新手机号，成功则绑定手机号
            cache:false,
            async:false,
            data:{
                jbsj:tel,
                jbyzm:yzm
            }
        }).done(function(data){//返回严重警告
            console.log(data.content);//验证成功下一步
            if (true) { //后台判断手机号验证是否成功
                $(".two").removeClass("sjhxg-con-xz");
                $(".two div").removeClass("sjhxg-con-xz1");
                $(".three").addClass("sjhxg-con-xz");
                $(".three div").addClass("sjhxg-con-xz1");
                $("#bdxsj").hide();
                $("#wcsjbd").show(); 
                $("#sjh-qx").hide();
                $("#wcts").attr("value", "您的手机号已更换为"+tel);
                $(btnid).attr('id','');
                $(".xyb-sjwc").attr('id','wc-btn');
                $(".xyb-sjwc" ).click( function(){
                    $('#ggxjh').hide();
                    $('#bdxsj').hide();
                    $('#wcsjbd').hide();
                    $('#jcsjbd').show();
                    $("#sjh-qx").show();
                    $(".header").show();
                    $(".two").removeClass("sjhxg-con-xz");
                    $(".two div").removeClass("sjhxg-con-xz1");
                    $(".three").removeClass("sjhxg-con-xz");
                    $(".three div").removeClass("sjhxg-con-xz1");
                    $(".one").addClass("sjhxg-con-xz");
                    $(".one div").addClass("sjhxg-con-xz1");
                    $("#ggxjh input").val("");
                    // $(".sjhxg-con-xyb").attr('id','');
                });
            } else {
                $(id).attr("value", "手机号或验证码不正确！");
            }
        })
    }  
}
//获取手机验证码
function hqsjyzm(id){
    var tel = $(id).val();
    $.ajax({
        type:'get',
        url:'../js/works.json',
        cache:false,
        async:false,
        data:{
            jbsj:tel
        }
    }).done(function(data){
            console.log(data.content);//验证成功
        })
}

//个人头像修改接口
function grtxbc(){
    console.log(document.getElementById("xdaTanFileImg").files[0]);
    var file=document.getElementById("xdaTanFileImg").files[0];
    var form = new FormData(); 
    form.append("file",file);
    $.ajax({
        type:'get',
        url:'../js/works.json',//保存头像到指定目录
        cache:false,
        async:false,
        data:form
    }).done(function(data){
            console.log(data.content);//验证成功返回图片保存地址
            $("#grtx-tx").attr("src",data.tpdz);
            $("#avarimgs").attr("src",data.tpdz);
            $("#txlg-img").attr("src",data.tpdz);
            $('#grtxbj').hide();    
            $('.header').show();
        })
}

function invokeSettime(sjid,obj){
    hqsjyzm(sjid);
    var countdown=60;
    settime(obj);
    function settime(obj) {
        if (countdown == 0) {
            $(obj).attr("disabled",false);
            $(obj).text("获取验证码");
            countdown = 60;
            return;
        } else {
            // $(".sjhxg-con-xyb").attr('id','');
            $(obj).attr("disabled",true);
            $(obj).text(countdown + "s 后重发");
            countdown--;
        }
        setTimeout(function() {
            settime(obj) }
            ,1000)
    }
}
//手机注册
function sjzcqk(){
    var tel=$('#sjzc-sjh').val();
    var yzm=$('#sjzc-sjyzm').val();
    var mm=$('#yhmm').val();
    var tpyz=$('#tpyz-zcts').val();
    var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/;
         //(p1.test(theinput));
         if (tel==null||tel=='') {
            $('#sjzc-ts').attr("value", "手机号码不能为空！");
        } else if(p1.test(tel)==false) {  
            $('#sjzc-ts').attr("value", "请输入正确的手机号码！");
        } else if (yzm.length!=6) {
            $('#sjzc-ts').attr("value", "验证码格式错误"); 
        } else if (8>mm.length>16) {console.log(mm.length)
            $('#sjzc-ts').attr("value", "密码须由8-16个字符或数字组成"); 
        } else if (tpyz==null||tpyz==''||tpyz=='失败') {console.log(tpyz)
         $('#sjzc-ts').attr("value", "按住滑块，拖动完成上方拼图验证"); 
        } else {//console.log(1)
            $('#sjzc-ts').attr("value", "");      
            $.ajax({
                type:'get',
                url:'/bcbb/js/works.json',//向用户表注册新用户、手机号、密码、注册时间、默认头像地址
                cache:false,
                async:false,
                data:{
                    jbsj:tel,
                    sjyzm:yzm,
                    zhmm:mm
                }
            }).done(function(data){
            console.log(data.content);//先查询该手机号是否已被注册，未注册则继续验证成功后台直接完成注册，并将用户id传给Cookie，  若以注册则返回提示，若失败提示重新注册
            if (true) {
             $('#sjzc-sjhzc').hide();
             $('#sjzc-wc').show();
         } else {
            $('#tpyz-zcxs').empty();
            $('#sjzc-ts').attr("value", "手机号码或验证码不正确");
                jigsaw.init({
                    el: document.getElementById('tpyz-zcxs'),
                    onSuccess: function() {
                  document.getElementById('tpyz-zcts').value = '成功'
                      },
                      onFail: cleanMsg,
                      onRefresh: cleanMsg
                  })
                    function cleanMsg() {
                        document.getElementById('tpyz-zcts').value = '失败'
                    }
        }
    })
        }

    }

//手机登录
function sjdxdl(){
    var tel=$('#sjdl-sjh').val();
    var yzm=$('#sjdl-sjyzm').val();
    var tpyz=$('#tpyz-dlts').val();
    var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/;
         //(p1.test(theinput));
         if (tel==null||tel=='') {
            $('#sjdl-ts').attr("value", "手机号码不能为空！");
        } else if(p1.test(tel)==false) {  
            $('#sjdl-ts').attr("value", "请输入正确的手机号码！");
        } else if (yzm.length!=6) {
            $('#sjdl-ts').attr("value", "验证码格式错误"); 
        } else if (tpyz==null||tpyz==''||tpyz=='失败') {console.log(tpyz)
         $('#sjdl-ts').attr("value", "按住滑块，拖动完成上方拼图验证"); 
        } else {//console.log(1)
            $('#sjdl-ts').attr("value", "");      
            $.ajax({
                type:'get',
                url:'/bcbb/js/works.json',
                cache:false,
                async:false,
                data:{
                    jbsj:tel,
                    sjyzm:yzm
                }
            }).done(function(data){
            console.log(data.content);//先查询该手机号是否已被注册，注册则继续验证成功后台返回结果，并将用户id传给Cookie，  若未注册或验证失败则返回相应提示
            if (!data) {    
                $('.header').show();
                $('#zhzcdl').hide();
                $('.sjhxg input').val('');
                $('#tpyz-dlxs').empty();
            } else {
                $('#tpyz-dlxs').empty();
                $('#sjdl-ts').attr("value", "手机号码或验证码不正确！");
                jigsaw.init({
                    el: document.getElementById('tpyz-dlxs'),
                    onSuccess: function() {
                  document.getElementById('tpyz-dlts').value = '成功'
                      },
                      onFail: cleanMsg,
                      onRefresh: cleanMsg
                  })
                    function cleanMsg() {
                        document.getElementById('tpyz-dlts').value = '失败'
                    }
            }
        })
        }

    } 

//手机账号登陆
function sjzhdl(){
    var tel=$('#zhdl-sjh').val();
    var mm=$('#zhdl-mm').val();
    // var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/;
         //(p1.test(theinput));
         if (tel==null||tel=='') {
            $('#zhdl-ts').attr("value", "手机号码不能为空！");
        } 
        // else if(p1.test(tel)==false) {  
        //     $('#sjzc-ts').attr("value", "请输入正确的手机号码！");
        // } 
        else if (8>mm.length>16) {console.log(mm.length)
            $('#zhdl-ts').attr("value", "密码须由8-16个字符或数字组成"); 
        } else {//console.log(1)
            $('#zhdl-ts').attr("value", "");      
            $.ajax({
                type:'get',
                url:'/bcbb/js/works.json',
                cache:false,
                async:false,
                data:{
                    jbsj:tel,
                    zhmm:mm
                }
            }).done(function(data){
            console.log(data.content);//先查询验证成功后台返回结果，并将用户id传给Cookie，  若未注册或验证失败则返回相应提示
            if (true) {
                $('.header').show();
                $('#zhzcdl').hide();
                $('#dl-sjzhdl').hide();
                $('#sjdl-sjhdl').show();
                $('.sjhxg input').val('');
                $('#tpyz-dlxs').empty();
            } else {
                $('#zhdl-ts').attr("value", "手机号或密码不正确！");
            }
        })
        }

    }

    function tpyz(nrid,tsid){
        jigsaw.init({
            el: document.getElementById(nrid),
            onSuccess: function() {
              document.getElementById(tsid).value = '成功'
          },
          onFail: cleanMsg,
          onRefresh: cleanMsg
      })
        function cleanMsg() {
            document.getElementById(tsid).value = '失败'
        }

    }

//绑定手机
function bdsjqk(){
    var tel=$('#bd-srsjh').val();
    var yzm=$('#bd-sjyzm').val();
    var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/;
         //(p1.test(theinput));
         if (tel==null||tel=='') {
            $('#bdsj-ts').attr("value", "手机号码不能为空！");
        } else if(p1.test(tel)==false) {  
            $('#bdsj-ts').attr("value", "请输入正确的手机号码！");
        } else if (yzm.length!=6) {
            $('#bdsj-ts').attr("value", "验证码格式错误"); 
        } else {//console.log(1)
            $('#bdsj-ts').attr("value", "");      
            $.ajax({
                type:'get',
                url:'/bcbb/js/works.json',
                cache:false,
                async:false,
                data:{
                    jbsj:tel,
                    sjyzm:yzm
                }
            }).done(function(data){
            console.log(data.content);//先查询该手机号是否已被注册，未注册则继续验证绑定，注册则提示改手机号已被注册，验证失败提示重新验证
            if (true) {
                $('#bdsj-wcbd').show();
                $('#bdsj-sj').hide();
                $(".bdsj-two").addClass("sjhxg-con-xz");
                $(".bdsj-two div").addClass("sjhxg-con-xz1");
                $(".bdsj-one").removeClass("sjhxg-con-xz");
                $(".bdsj-one div").removeClass("sjhxg-con-xz1");
            } else {
                $('#bdsj-ts').attr("value", "请输入正确的手机号码或验证码！");
            }
        })
        }
    }

//密码验证
function dqzhmmyz(){
    var mm=$('#yhmm-mm').val();
    if (mm==null||mm=='') {
        $('#dlmm-ts').attr("value", "请输入密码");
    } if (mm.length<8) {
        $('#dlmm-ts').attr("value", "密码须由8-16个字符或数字组成");
    } else {
        $.ajax({
            type:'get',
            url:'../js/works.json',
            cache:false,
            async:false,
            data:{
                mm:mm,
                userid:userid
            }
        }).done(function(data){
                console.log(data.content);//返回验证结果
                if (true) {
                    $('#dlmm-yz').hide();    
                    $('#dlmm-szxmm').show();
                    $('.dlmm-one').removeClass('sjhxg-con-xz');
                    $('.dlmm-two').addClass('sjhxg-con-xz');
                } else {
                     $('#dlmm-ts').attr("value", "密码输入错误，请重新输入");
                }
                // $("#dlmm-ts").attr("src",data.tpdz);
                // $("#avarimgs").attr("src",data.tpdz);
                // $("#txlg-img").attr("src",data.tpdz);
                
            })
    }
}
//密码更改
function dqzhmmgg(){
    var mm=$('#dlmm-xmm').val();
    var qrmm=$('#dlmm-qrxmm').val();
    if (mm==null||mm==''||qrmm==null||qrmm=='') {
        $('#xmm-ts').attr("value", "请输入密码");
    } if (mm!=qrmm) {
        $('#xmm-ts').attr("value", "两次输入密码不一致");
    } if (mm.length<8) {
        $('#xmm-ts').attr("value", "密码须由8-16个字符或数字组成");
    } else {
        $.ajax({
            type:'get',
            url:'../js/works.json',
            cache:false,
            async:false,
            data:{
                mm:mm,
                userid:userid
            }
        }).done(function(data){
                console.log(data.content);//返回验证结果
                if (true) {
                    $('#dlmm-wcbd').show();    
                    $('#dlmm-szxmm').hide();
                    $('.dlmm-two').removeClass('sjhxg-con-xz');
                    $('.dlmm-three').addClass('sjhxg-con-xz');
                } else {
                     $('#xmm-ts').attr("value", "密码输入错误，请重新输入");
                }
                // $("#dlmm-ts").attr("src",data.tpdz);
                // $("#avarimgs").attr("src",data.tpdz);
                // $("#txlg-img").attr("src",data.tpdz);
                
            })
    }
}
//密码修改验证
function dlmmsjhyz(){
    var tel=$('#dlmm-sjh').val();
    var yzm=$('#dlmm-yzm').val();
    var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\{8}|14[57]\d{8})$/;
         //(p1.test(theinput));
         if (tel==null||tel=='') {
            $('#dlmmsjh-ts').attr("value", "手机号码不能为空！");
        } else if(p1.test(tel)==false) {  
            $('#dlmmsjh-ts').attr("value", "请输入正确的手机号码！");
        } else if (yzm.length!=6) {
            $('#dlmmsjh-ts').attr("value", "验证码格式错误"); 
        } else {//console.log(1)
            $('#dlmmsjh-ts').attr("value", "");      
            $.ajax({
                type:'get',
                url:'/bcbb/js/works.json',
                cache:false,
                async:false,
                data:{
                    jbsj:tel,
                    sjyzm:yzm
                }
            }).done(function(data){
                console.log(data.content);//返回验证结果
                if (true) {   
                    $('#dlmm-szxmm').show();
                    $('#dlmm-wj').hide(); 
                    $('.dlmm-one').removeClass('sjhxg-con-xz');
                    $('.dlmm-two').addClass('sjhxg-con-xz');
                } else {
                     $('#dlmmsjh-ts').attr("value", "手机号或验证码不正确！");
                }
                // $("#dlmm-ts").attr("src",data.tpdz);
                // $("#avarimgs").attr("src",data.tpdz);
                // $("#txlg-img").attr("src",data.tpdz);
                
            })
    }
}
$('.works-selt li').click(function(){
   // $('.works-selt li').addClass('cur');
   $('.works-selt li').removeClass("cur");
   $(this).addClass("cur");
});
$("#qbzp").click(function(){
   $('#all').empty();
   $('#pages').empty();
   $('#czxx-wdzp').hide();
   wokesAll();
})
$("#jxzp").click(function(){
    $('#all').empty();
    $('#czxx-wdzp').hide();
    $('#pages').empty();
    wokesJx();
})
$("#rmzp").click(function(){
    $('#all').empty();
    $('#czxx-wdzp').hide();
    $('#pages').empty();
    wokesRm();
})
$("#wdzp").click(function(){
    $('#all').empty();
    $('#pages').empty();
    wokesWd();
        // wokesYfb('#all');
})

////我的作品
$("#grzp").click(function(){
    $(".zpfbqk").show();
    $(".content-grzl").hide();
    $('.wfb').removeClass("xz");
    $('.yfb').addClass("xz");
    $('#pages').empty();
    $('.content-zp').empty();
    wokesYfb('.content-zp');//
})
//收藏作品
$("#sczp").click(function(){
    $(".zpfbqk").hide();
    $(".content-grzl").hide();
    $('#pages').empty();
    $('.content-zp').empty();
    wokesSczp();
})
//个人资料
$("#grzl").click(function(){
    $(".zpfbqk").hide();
    $('.content-zp').empty();
    $(".content-grzl").show();
    $("#jczl-xs").show();
    $('#pages').empty();
    $("#jczl-xg").hide();
    grzlxs();
    // wokesSczp();
})

$(".zpfbqk li").click(function(){
        // $('.works-selt li').addClass('cur');
        $('.zpfbqk li').removeClass("xz");
        $(this).addClass("xz");
    });

$(".yfb").click(function(){
    $('.content-zp').empty();
    $('#all').empty();
    $('#pages').empty();
    wokesYfb('.content-zp');
    wokesYfb('#all');
})
$(".wfb").click(function(){
    $('.content-zp').empty();
    $('#all').empty();
    $('#pages').empty();
    wokesWfb('.content-zp');
    wokesWfb('#all');
})


$("#zlxg").click(function(){
    $("#jczl-xs").hide();
    $("#jczl-xg").show();
    zlxgfz();
})
$("#zlbc").click(function(){
    $("#jczl-xs").show();
    $("#jczl-xg").hide();
    grjbzlxs();
})

   //验证手机号是否正确     
   $("#ysjh").bind('input propertychange',function () {
        // var summary=$(this).val();
        yzsjh('#ysjh','#ysjhts');
    });
   $("#xsjh").bind('input propertychange',function () {
        // var summary=$(this).val();
        yzsjh('#xsjh','#xsjhts');
    });
   $("#bd-srsjh").bind('input propertychange',function () {
        // var summary=$(this).val();
        yzsjh('#bd-srsjh','#bdsj-ts');
    });
 //   
 $("#ysjyzm").bind('input propertychange',function () {
        // var summary=$(this).val();
        jbsjyzm('#ysjh','#ysjyzm','#ysjhts','#jbsjh-btn','.xyb-sjjb');
    });
 $("#xsjyzm").bind('input propertychange',function () {
        // var summary=$(this).val();
        jbsjyzm('#xsjh','#xsjyzm','#xsjhts','#xbsjh-btn','.xyb-sjxb');
    });
//关闭手机更改
$("#sjh-qx").click(function(){
    $('#ggxjh').hide();
    $('#bdxsj').hide();
    $('#wcsjbd').hide();
    $('#jcsjbd').show();
    $('.header').show();
    $(".two").removeClass("sjhxg-con-xz");
    $(".two div").removeClass("sjhxg-con-xz1");
    $(".three").removeClass("sjhxg-con-xz");
    $(".three div").removeClass("sjhxg-con-xz1");
    $(".one").addClass("sjhxg-con-xz");
    $(".one div").addClass("sjhxg-con-xz1");
    $("#ggxjh input").val("");
    $(".xyb-sjjb").attr('id','');
    $(".xyb-sjxb").attr('id','');
    // $("#jczl-xg").hide();
})
//关闭手机bd
$("#bdsjh-qx").click(function(){
    $('#bd-sjhbd').hide();
    $('#bdsj-wcbd').hide();
    $('#bdsj-sj').show();
    $('.header').show();
    $(".bdsj-two").removeClass("sjhxg-con-xz");
    $(".bdsj-two div").removeClass("sjhxg-con-xz1");
    $(".bdsj-one").addClass("sjhxg-con-xz");
    $(".bdsj-one div").addClass("sjhxg-con-xz1");
    $("#bd-sjhbd input").val("");
    // $("#jczl-xg").hide();
})
$("#bdsj-btn").click(function(){
    $('#bd-sjhbd').hide();
    $('#bdsj-wcbd').hide();
    $('#bdsj-sj').show();
    $('.header').show();
    $(".bdsj-two").removeClass("sjhxg-con-xz");
    $(".bdsj-two div").removeClass("sjhxg-con-xz1");
    $(".bdsj-one").addClass("sjhxg-con-xz");
    $(".bdsj-one div").addClass("sjhxg-con-xz1");
    $("#bd-sjhbd input").val("");
    // $("#jczl-xg").hide();
})

//获取手机验证码
$("#jbsj-hqyzm").click(function(){
    // hqsjyzm('#ysjh');
    invokeSettime('#ysjh','#jbsj-hqyzm');
})
$("#bdsj-hqyzm").click(function(){
    // hqsjyzm('#xsjh');
    invokeSettime('#xsjh','#bdsj-hqyzm');
})


//头像编辑
$(".user").click(function(){
    $('#grtxbj').show();    
    $('.header').hide();
    // $('#zhzcdl').();
    // $("#jczl-xg").hide();
}) 
$(".modal-txxg-qxxg").click(function(){
    $('#grtxbj').hide();    
    $('.header').show();
    // $('#zhzcdl').hide();
    // $("#jczl-xg").hide();
}) 

$(".modal-txxg-txbc").click(function(){
    grtxbc();
}) 



$(".wxh-qx").click(function(){
    $('#ghwxh').hide();
    $('#wxh-wcbd').hide();
    $('#wxh-cxbd').hide();
    $('.header').show();
    $('#wxh-jcbd').show();
    $(".two").removeClass("sjhxg-con-xz");
    $(".two div").removeClass("sjhxg-con-xz1");
    $(".three").removeClass("sjhxg-con-xz");
    $(".three div").removeClass("sjhxg-con-xz1");
    $(".one").addClass("sjhxg-con-xz");
    $(".one div").addClass("sjhxg-con-xz1");
    $("#ggxjh input").val("");
    // $(".sjhxg-con-xyb").attr('id','');
    $("#jczl-xg").hide();
})

//手机注册
$(".zc").click(function(){
    $('#zhzcdl').show();
    $('.header').hide();
    tpyz('tpyz-zcxs','tpyz-zcts');
    tpyz('tpyz-dlxs','tpyz-dlts');
})
$("#tx-zcdl").click(function(){
    $('#zhzcdl').show();
    $('.header').hide();
    tpyz('tpyz-zcxs','tpyz-zcts');
    tpyz('tpyz-dlxs','tpyz-dlts');
})

$("#zc-wxsm").click(function(){
    $('#sjzc-sjhzc').hide();
    $('#wxh-zc').show();
})


$("#ysjhzc").click(function(){
    $('#sjzc-sjhzc').show();
    $('#wxh-zc').hide();
})

$("#sjzc-sjh").bind('input propertychange',function () {
        // var summary=$(this).val();
        yzsjh('#sjzc-sjh','#sjzc-ts');
});

$("#sjzc").click(function(){
    sjzcqk();
})

$("#sjzc-qws").click(function(){
    // $('#zhzcdl').hide();
    $(location).attr('href', '/bcbb/creative_centre/personal_center.html?top=0');
    //  $(".zpfbqk").hide();
    // $('.content-zp').empty();
    // $(".content-grzl").show();
    // $("#jczl-xs").show();
    // $("#jczl-xg").hide();
    // grzlxs();
    // wsgrzl();
})

//登录注册关闭
$("#zc-gb").click(function(){
    $('.header').show();
    $('#zhzcdl').hide();
    $('.sjhxg input').val('');
    $('#tpyz-dlxs').empty();
    $('#tpyz-zcxs').empty();
    $('.xyzh').removeClass('sjhxg-con-xz');
    $('.sjdl').addClass('sjhxg-con-xz');
    $('#xyzh-xs').hide();
    $('#sjdl-sjhdl').hide();
    $('#wxh-dl').hide();
    $('#sjzc-sjhzc').hide();
    $('#wxh-zc').hide();
    $('#sjzc-wc').hide();
    $('#dl-sjzhdl').hide();
    $('#sjdl-dl').show();
    $('#sjdl-sjhdl').show();
})


//

$("#txlg-img").click(function(){
    $(location).attr('href', '/bcbb/creative_centre/personal_center.html');
})
//打开登录
$("#zx-qdl").click(function(){
    $('#sjzc-zc').hide();
    $('#sjdl-dl').show();
})
//打开注册
$("#zx-qzc").click(function(){
    $('#sjzc-zc').show();
    $('#sjzc-sjhzc').show();
    $('#sjdl-dl').hide();
    $('#tpyz-zcxs').empty();
    tpyz('tpyz-zcxs','tpyz-zcts');
})
$("#dl-wxsm").click(function(){
    $('#wxh-dl').show();
    $('#sjdl-sjhdl').hide();
})
$("#thsjhdl").click(function(){
    $('#wxh-dl').hide();
    $('#sjdl-sjhdl').show();
})
$("#dl-dxdl").click(function(){
    $('#dl-sjzhdl').hide();
    $('#sjdl-sjhdl').show();
    $('#tpyz-dlxs').empty();
    tpyz('tpyz-dlxs','tpyz-dlts');
})
$("#dl-zhdl").click(function(){
    $('#dl-sjzhdl').show();
    $('#sjdl-sjhdl').hide();
})
$("#zh-qzc").click(function(){
    $('#sjzc-zc').show();
    $('#sjzc-sjhzc').show();
    $('#sjdl-dl').hide();
    $('#tpyz-zcxs').empty();
    tpyz('tpyz-zcxs','tpyz-zcts');
})
$("#zh-wxsm").click(function(){
    $('#wxh-dl').show();
    $('#dl-sjzhdl').hide();
})
$(".xyzh").click(function(){
    $('.sjdl').removeClass('sjhxg-con-xz');
    $('.xyzh').addClass('sjhxg-con-xz');
    $('#xyzh-xs').show();
    $('#sjdl-sjhdl').hide();
    $('#wxh-dl').hide();
    $('#dl-sjzhdl').hide();
})
$(".sjdl").click(function(){
    $('.xyzh').removeClass('sjhxg-con-xz');
    $('.sjdl').addClass('sjhxg-con-xz');
    $('#xyzh-xs').hide();
    $('#sjdl-sjhdl').show();
})

//sjdl
$("#sjdl-zhdl").click(function(){
    sjzhdl()
})
$("#sjdl-dxdl").click(function(){
    sjdxdl()
})   
//验证手机号是否正确     
$("#sjdl-sjh").bind('input propertychange',function () {
        // var summary=$(this).val();
        yzsjh('#sjdl-sjh','#sjdl-ts');
    });

//合成事件 hover()  
$(".czxx").hover(function (){  
    $(".create-hover-content").show();  
},function (){  
    $(".create-hover-content").hide();  
});  

$("#bdsj-xyb").click(function(){
    bdsjqk();
})  

$("#mmxg-qx").click(function(){
    $('.header').show();
    $('#dlmmgh').hide();
    $('.dlmm-three').removeClass('sjhxg-con-xz');
    $('.dlmm-two').removeClass('sjhxg-con-xz');
    $('.dlmm-one').addClass('sjhxg-con-xz');
    $('#dlmm-wcbd').hide();    
    $('#dlmm-szxmm').hide();
    $('#dlmm-yz').hide();    
    $('#dlmm-yz').show();      
    $('.sjhxg-con-jb input').attr('value','');  
})  
$("#xyb-mmyz").click(function(){
    dqzhmmyz();
})  

//密码显示
$("#mmxs-xmm").click(function(){
    var type=$("#dlmm-xmm").prop("type");
    if (type=='password') {
        $("#dlmm-xmm").prop("type","text");
        $("#mmxs-xmm").attr("src","/bcbb/images/look.png");

    } else {
        $("#mmxs-xmm").attr("src","/bcbb/images/no-look.png");
        $("#dlmm-xmm").prop("type","password");
    }
})
$("#mmxs-qrxmm").click(function(){
    var type=$("#dlmm-qrxmm").prop("type");
    if (type=='password') {
        $("#dlmm-qrxmm").prop("type","text");
        $("#mmxs-qrxmm").attr("src","/bcbb/images/look.png");

    } else {
        $("#mmxs-qrxmm").attr("src","/bcbb/images/no-look.png");
        $("#dlmm-qrxmm").prop("type","password");
    }
})
$("#yhmm-sfkj").click(function(){
    var type=$("#yhmm").prop("type");
    if (type=='password') {
        $("#yhmm").prop("type","text");
        $("#yhmm-sfkj").attr("src","/bcbb/images/look.png");

    } else {
        $("#yhmm-sfkj").attr("src","/bcbb/images/no-look.png");
        $("#yhmm").prop("type","password");
    }
}) 
$("#yhmm-kj").click(function(){
    var type=$("#yhmm-mm").prop("type");
    if (type=='password') {
        $("#yhmm-mm").prop("type","text");
        $("#yhmm-kj").attr("src","/bcbb/images/look.png");

    } else {
        $("#yhmm-kj").attr("src","/bcbb/images/no-look.png");
        $("#yhmm-mm").prop("type","password");
    }
}) 
$("#xyb-mmgg").click(function(){
    dqzhmmgg();
}) 

$("#mmwc-btn").click(function(){
    $('.header').show();
    $('#dlmmgh').hide();
    $('.dlmm-three').removeClass('sjhxg-con-xz');
    $('.dlmm-two').removeClass('sjhxg-con-xz');
    $('.dlmm-one').addClass('sjhxg-con-xz');
    $('#dlmm-wcbd').hide();    
    $('#dlmm-szxmm').hide();
    $('#dlmm-wj').show();    
    $('#dlmm-yz').hide();    
    $('.sjhxg-con-jb input').attr('value','');
}) 

$("#dlmm-sjh").bind('input propertychange',function () {
        // var summary=$(this).val();
        yzsjh('#dlmm-sjh','#dlmmsjh-ts');
});
$("#dlmm-wjmm").click(function(){
    $('#dlmm-yz').hide();    
    $('#dlmm-wj').show();    
}) 
//密码修改验证
$("#dlmmsjh-xyb").click(function(){
    dlmmsjhyz();
}) 
