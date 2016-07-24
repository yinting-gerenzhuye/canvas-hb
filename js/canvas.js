function shape(canvas,cobj,copy){
    this.canvas=canvas;
    this.cobj=cobj;
    this.copy=copy;
    this.width=canvas.width;
    this.height=canvas.height;
    this.type="line";
    this.fillStyle="#000";
    this.lineWidth=1;
    this.strokeStyle="#000";
    this.style="stroke";
    this.biannum=5;
    this.jiaonum=5;
    this.xpsize=15;
    this.history=[];
}
shape.prototype={
    init:function(){
        this.cobj.lineWidth=this.lineWidth;
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
    },
    
    draw:function(){
        if(this.type=="fanhui"){
            this.history.pop();
            if(this.history.length==0){
                this.cobj.clearRect(0,0,this.canvas.width,this.canvas.height);
                alert("不能返回");
            }else{
                this.cobj.putImageData(this.history[this.history.length-1],0,0);
            }
        }
        var that=this;
        this.copy.onmousedown=function(e){
            var startx=e.offsetX;
            var starty=e.offsetY;
            if(that.type=="pen"){
                that.cobj.beginPath();
                moveTo(startx,starty);
            }
            that.init();
            that.copy.onmousemove=function(e){
                var endx=e.offsetX;
                var endy=e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length!=0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that[that.type](startx,starty,endx,endy);
            }

            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height))
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
            }
        }

    },
    line:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj[this.style]();
        this.cobj.closePath();
    },
    arc:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        this.cobj.arc(x,y,r,0,Math.PI*2);
        this.cobj[this.style]();
        this.cobj.closePath();
    },
    bian:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var angle=360/this.biannum*Math.PI/180;
        this.cobj.beginPath();
        for(var i=0;i<this.biannum;i++){
            this.cobj.lineTo(x+Math.cos(angle*i)*r,y+Math.sin(i*angle)*r);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        var angle=360/(this.jiaonum*2)*Math.PI/180;
        this.cobj.beginPath();
        for(var i=0;i<this.jiaonum*2;i++){
            if(i%2==0) {
                this.cobj.lineTo(x + Math.cos(angle*i) * r, y + Math.sin(angle*i) * r);
            }else{
                this.cobj.lineTo(x + Math.cos(angle*i) * r1, y + Math.sin(angle*i) * r1);

            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    pen:function(x,y,x1,y1){
        this.cobj.lineTo(x1,y1);
        this.cobj[this.style]();
    },
    xpfun:function(xpobj){
        var that=this;
        that.copy.onmousemove=function(e){
            that.move(e,that,xpobj);
        }
        that.copy.onmousedown=function (e) {
            var startx=e.offsetX;
            var starty=e.offsetY;
            that.copy.onmousemove=function (e) {
                var endx=e.offsetX;
                var endy=e.offsetY;
                that.move(e,that,xpobj)
                that.cobj.clearRect(endx-(that.xpsize+2)/2,endy-(that.xpsize+2)/2,that.xpsize,that.xpsize);
            }
            that.copy.onmouseup=function () {
                that.history.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.xpfun(xpobj);
            }
        }

    },

    move:function (e,that,xpobj) {
        var movex=e.offsetX;
        var movey=e.offsetY;
        var left=movex-(that.xpsize+2)/2;
        var top=movey-(that.xpsize+2)/2;
        if(left<0){
            left=0;
        }
        if(left>that.canvas.width-(that.xpsize+2)){
            left=that.canvas.width-(that.xpsize+2);
        }
        if(top<0){
            top=0;
        }
        if(top>that.canvas.height-(that.xpsize+2)){
            top=that.canvas.height-(that.xpsize+2);
        }
        xpobj.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px;";
    }


}
