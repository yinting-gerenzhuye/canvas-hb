$(function(){
    var top=$(".top");
    var xuan=$(".xuan");
    var slide=$(".slide");
    var canvas=$("canvas")[0];
    var cobj=canvas.getContext("2d");
    var copy=$(".copy")[0];
    var shapes=new shape(canvas,cobj,copy);
    
    top.hover(function(){
        $(this).find(xuan).stop(true,true);
        $(this).find(xuan).slideDown();
    },function(){
        $(this).find(xuan).stop(true,true)
        $(this).find(xuan).slideUp();
    });
    slide.click(function(){
        slide.removeClass("g");
        $(this).toggleClass("g");
    })
    xuan.eq(1).find(slide).click(function(){
        shapes.type=$(this).attr("data-role");
        shapes.draw();
    })
    xuan.eq(2).find(slide).click(function(){
        shapes.style=$(this).attr("data-role");
        shapes.draw();
    })
    $(".xw").change(function(){
        shapes.lineWidth=$(this).val();
        shapes.draw();
    })
    $(".num").change(function(){
        shapes.biannum=$(this).val();
        shapes.jiaonum=$(this).val();
        shapes.draw();
    })
    $(".linecolor").change(function(){
        shapes.strokeStyle=$(this).val();
        shapes.draw();
    })
    $(".fillcolor").change(function(){
        shapes.fillStyle=$(this).val();
        shapes.draw();
    })
    $(".back").click(function(){
        shapes.type=$(this).attr("data-role");
        shapes.draw();
    })
    //橡皮
    $(".xiangpi").find(slide).click(function(){
       var attr=$(this).attr("data-role");
        shapes.xpsize=parseInt(attr);
        shapes.xpfun(document.getElementsByClassName("xp")[0]);
       
    })
    $(".xpinput").change(function(){
        var attr=$(this).val();
        shapes.xpsize=parseInt(attr);
        shapes.xpfun(document.getElementsByClassName("xp")[0]);
    })
    $(".top:not(.gxp)").click(function(){
        $(".xp").css({display:"none"});
        copy.onmousemove=null;
    })

    $(".qk").click(function(){
        cobj.clearRect(0,0,canvas.width,canvas.height);
        shapes.history=[];
    })
    /*保存文件*/
    $('.save').click(function(){
        $('#save').css({
            top:0,
            opacity:1
        })
        $('#save').find("#yes").click(function(){

            var data=canvas.toDataURL();
            location.href=data.replace('image/png','image/octent-stream');
            $('#save').css({
                opacity:0,
            })
           
        })
        $('#save').find("#no").click(function(){
            // drawObj.dataArr=drawObj.dataArr.slice(0);
            cobj.clearRect(0,0,canvas.width,canvas.height);
            $('#save').css({
                opacity:0

            })
            location.reload()
        })
    });
    
    
})