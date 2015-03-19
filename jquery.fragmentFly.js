;(function($){
 // 这里写代码了啦
$.fn.extend({
    /**
     * [fragment 碎片视差动画插件]
     *
     * @param {[divisionSetting]}
     *            分割设置，{
     *						 image_url:url,
     *                       cut_dir:"x","y",
     *                       ave_part:ave_part,
     *                       rm_part:rm_part
     *                    }
     * @param {[animeSetting]}
     *            动画设置，{
     *                       anime_dir:"down","up","left","right"
     *                       path:[100,200]
     *                       time:[2000,3000]
     *						 opacity:[0,1]
     *                    }
     * @return null
     */

    "fragmentFly":function(divisionSetting,animeSetting){
        // jQuery对象的方法扩展，所以用jQuery.fn.extend()来编写
        cardDom=$(this);
        //绑定的图像的宽高，以此作为切割标
 准       var cardHeight=cardDom.height();
        var cardWidth=cardDom.width();
        //获取ID，作为生成元素的主标识
        var cardDomName=cardDom.attr("id");
        var url=divisionSetting.image_url;

        var cardCopyObjects;

        // 获取divisionSetting内的数值。完成分割。
        //指定参数为空时自动使用默认值。横向均分为12份，纵向随机分成2,3份。
        var cut_dir=divisionSetting.cut_dir?divisionSetting.cut_dir:"x";    //平均切割的方向
        var ave_part=divisionSetting.ave_part?divisionSetting.ave_part:12;  //平均切割份数
        var rm_part=divisionSetting.rm_part?divisionSetting.rm_part:[2,3];  //随机切割份数，最小份数与最大份数
        var rm_part_min;
        var rm_part_max;
        if (rm_part.length==1){
            rm_part_min=rm_part[0];
            rm_part_max=rm_part[0];
        }else{
            rm_part_min=rm_part[0];
            rm_part_max=rm_part[1];
        }

        var unitX;	//X方向上切割单位宽度
        var unitY;	//Y方向上切割单位宽度
        // var unitY1;
        // var unitY2;

        // 随机数生成函数，n为生成1-n的数
        var getRandom=function(n){  
            return Math.floor(Math.random()*n+1)
        }

        if (cut_dir=="x"){
            unitX=cardWidth/ave_part;
            // unitY1=cardHeight/2;
            // UnitY2=cardHeight/3;
        }else {
        	unitY=cardHeight/ave_part;
        }

        var creatTitleCopy="";
        var eachTitle;

        var randomPart;
        var randomArr=[];

        var opacity=animeSetting.opacity?animeSetting.opacity:[1,1];
        var opacity_start;
        var opacity_end;
        if (opacity.length==1){
            opacity_start=opacity[0];
            opacity_end=opacity[0];
        }else{
        	opacity_start=opacity[0];
            opacity_end=opacity[1];
        }

        for (var i=0;i<ave_part;i++){
            // var isRandom=(i%2==0)?2:3;
            randomPart=getRandom((rm_part_max-rm_part_min)+1)+rm_part_min-1;//此为满足[min,max]的随机值
            // unitY=(i%2==0)?unitY1:unitY2;
            if (cut_dir=="x"){
	            unitY=cardHeight/randomPart;
    		}else{
    			unitX=cardWidth/randomPart;
    		}
            randomArr.push(randomPart);
            for (var j=0;j<randomPart;j++){
            	var left;
                var top;
                var width;
                var height;

                if (cut_dir=="x"){
                	left=i*unitX;
                    top=j*unitY;
                	width=unitX;
                	height=unitY;
                }else{
                	left=j*unitX;
                	top=i*unitY;
                	width=unitX;
                	height=unitY;
                }

                var styleStr="style=\"position:absolute;z-index:10;opacity:"+opacity_start+";left:"+left+"px;top:"+top+"px;width:"+width+"px;height:"+height+"px;background:url("+url+") no-repeat -"+left+"px -"+top+"px;\"";
          
                eachTitle="<div id=\""+cardDomName+"_cardCopy"+i+"_"+j+"\" "+styleStr+"></div>";
                creatTitleCopy+=eachTitle;
    
            } //for (var j=0;j<isRandom;j++)
        } //for (var i=0;i<12;i++)
      
    
    cardDom.html(creatTitleCopy);

    //获取动画setting的值
 // @param {[animeSetting]}
 //     *            动画设置，{
 //     *                       anime_dir,
 //     *                       path:[100 50],
 //     *                       time:[2000 500]
 //     *                    }
 //     * @return null
 //     */
    //有默认动画设置，默认是向下，最短路长500，最长路长800，最短时间1000ms，最长时间1300ms.
    var anime_dir=animeSetting.anime_dir?animeSetting.anime_dir:"down";    //动画的方向
    var path=animeSetting.path?animeSetting.path:[500,800];
    var time=animeSetting.path?animeSetting.time:[1000,1300];
    // 绑动画

    var anime_dir_parm;
    var animeDirFlag;   //动画方向标识
    //模式选择
    switch(anime_dir){
        case "down":
            anime_dir_parm="top";        
            animeDirFlag=1;
           break;
        case "up":
            anime_dir_parm="top";
            animeDirFlag=0;
            break;
        case "left":
            anime_dir_parm="left";
            animeDirFlag=0;
            break;
        case "right":
            anime_dir_parm="left";
            animeDirFlag=1;
            break;
    }  

    var path_min;
    var path_max;

    var time_min;
    var time_max;

    if (path.length==1){
        path_min=path[0];
        path_max=path[0];
    }else{
        path_min=path[0];
        path_max=path[1];
    }
    if (time.length==1){
        time_min=time[0];
        time_max=time[0];
    }else{
        time_min=time[0];
        time_max=time[1];
    }

    

    for (var i=0;i<ave_part;i++){
        // var isRandom=(i%2==0)?2:3;
        var randomPartShift=randomArr.shift();
        for (var j=0;j<randomPartShift;j++){
            var randomY=getRandom(path_max-path_min+1)+path_min-1;

            var title_y_path="+="+randomY.toString()+"px";
            var title_y_path_ready="-="+randomY.toString()+"px";

            var time=getRandom(time_max-time_min+1)+time_min-1;

            if (anime_dir_parm=="top"){
                if (animeDirFlag==1){
                	$("#"+cardDomName+"_cardCopy"+i+"_"+j)
                		.css("opacity",opacity_end)
                		.css("transition","opacity "+time/1000+"s");

                    $("#"+cardDomName+"_cardCopy"+i+"_"+j)
                        .animate({
                        top:(title_y_path_ready)
                    },0)
                        .animate({
                        top:title_y_path
                    },time,"swing");
                }else if(animeDirFlag==0){
                	$("#"+cardDomName+"_cardCopy"+i+"_"+j)
                		.css("opacity",opacity_end)
                		.css("transition","opacity "+time/1000+"s");

                    $("#"+cardDomName+"_cardCopy"+i+"_"+j)
                        .animate({
                        top:title_y_path
                    },0)
                        .animate({
                        top:title_y_path_ready
                    },time,"swing");
                }
            }   //if (anime_dir_parm=="top")
            else if(anime_dir_parm=="left"){
                if (animeDirFlag==1){
                	$("#"+cardDomName+"_cardCopy"+i+"_"+j)
                		.css("opacity",opacity_end)
                		.css("transition","opacity "+time/1000+"s");

                    $("#"+cardDomName+"_cardCopy"+i+"_"+j)
                        .animate({
                        left:(title_y_path_ready)
                    },0)
                        .animate({
                        left:title_y_path
                    },time,"swing");
                }else if(animeDirFlag==0){
                	$("#"+cardDomName+"_cardCopy"+i+"_"+j)
                		.css("opacity",opacity_end)
                		.css("transition","opacity "+time/1000+"s");

                    $("#"+cardDomName+"_cardCopy"+i+"_"+j)
                        .animate({
                        left:title_y_path
                    },0)
                        .animate({
                        left:title_y_path_ready
                    },time,"swing");
                }
            }   //else if(anime_dir_parm=="left")

        } // for (var j=0;j<isRandom;j++)
    } //for (var i=0;i<12;i++)
 













    }//"fragmentFly":function(objectArray,camera,callBack)

});
})(jQuery);







