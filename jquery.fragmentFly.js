;(function($){
 // 这里写代码了啦
$.fn.extend({
    /**
     * [fragmentFly 碎片视差动画插件]
     * @写于15/3/18
     * @最后修改15/3/21
     * @author：Ahkari
     *
     * @param {[divisionSetting]}
     *            分割设置，{
     *						 image_url:url,
     *                       cut_dir:"x","y",
     *                       ave_part:12,
     *                       rm_part:[2,3]
     *                    }
     * @param {[animeSetting]}
     *            动画设置，{
     *                       anime_dir:"down","up","left","right"
     *                       path:[500,800]
     *                       time:[1000,1300]
     *						 opacity:[1,1]
     *                    }
     * @return null
     */

    "fragmentFly":function(divisionSetting,animeSetting){
        // jQuery对象的方法扩展，所以用jQuery.fn.extend()来编写
        cardDom=$(this);
        //绑定的图像的宽高，以此作为切割标准
        var cardHeight=cardDom.height();
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
        var rm_part_min;    //随机方向上最小可能值
        var rm_part_max;    //随机方向上最大可能值
            ave_part=Number(ave_part);
        if (rm_part.length==1){
            rm_part_min=Number(rm_part[0]);
            rm_part_max=Number(rm_part[0]);
        }else{
            rm_part_min=Number(rm_part[0]);
            rm_part_max=Number(rm_part[1]);
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
            unitX=cardWidth/ave_part;   //X方向均分的单位长度
            // unitY1=cardHeight/2;
            // UnitY2=cardHeight/3;
        }else {
        	unitY=cardHeight/ave_part;
        }

        var creatTitleCopy="";  //被html进去的全部元素字符串
        var eachTitle;          //单个元素，一个个添加进creatTitleCopy中

        var randomPart;         //随机方向上份数
        var randomArr=[];       //记录每个随机数，便于之后动画绑定同样的份数

        var opacity=animeSetting.opacity?animeSetting.opacity:[1,1];
        var opacity_start;
        var opacity_end;
        if (opacity.length==1){
            opacity_start=Number(opacity[0]);
            opacity_end=Number(opacity[0]);
        }else{
           	opacity_start=Number(opacity[0]);
            opacity_end=Number(opacity[1]);
            
        }
        //分割操作。外层是均等分割，内层是随机分割。
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
      
    
    cardDom.html(creatTitleCopy);   //元素添加进入cardDom

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

    //路径参数
    if (path.length==1){
        path_min=Number(path[0]);
        path_max=Number(path[0]);
    }else{
        path_min=Number(path[0]);
        path_max=Number(path[1]);
    }
    //时间参数
    if (time.length==1){
        time_min=Number(time[0]);
        time_max=Number(time[0]);
    }else{
        time_min=Number(time[0]);
        time_max=Number(time[1]);
    }

    
    //动画绑定。外层是均分层，内层是随机方向。随机值取自之前分割时的随机值数组。
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







