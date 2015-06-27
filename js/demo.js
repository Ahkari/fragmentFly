$(function(){
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
    $("#fragment_title").fragmentFly({
     	image_url:"./img/title.png",
     	cut_dir:"x",
     	ave_part:8,
     	rm_part:[3,6]
     },{
     	anime_dir:"up",
     	path:[100,200],
     	time:[600,1000],
     	opacity:[0,1]
     });


     $(".nav_ul>li:first-child").on("click",function(){
          $("html,body").animate({scrollTop:$("#useInformation").offset().top},300);
     });
     $(".nav_ul>li:nth-child(2)").on("click",function(){
          $("html,body").animate({scrollTop:$("#quickSetting").offset().top},600);
     });
     $(".nav_ul>li:nth-child(3)").on("click",function(){
          $("html,body").animate({scrollTop:$("#animeModifi").offset().top},800);
     });
     $(".nav_ul>li:nth-child(4)").on("click",function(){
          $("html,body").animate({scrollTop:$(".wrap_bottom").offset().top},900);
     });

     
     //让动画模拟处的按钮初始化芹况满足预期，并绑定焦点切换事件。
     // for (var i=0;i<6;i++){
     //      var che=$("input[name=progress"+(i+1)+"]:checked");
     //      console.log(che.val());
     //      $(".input"+(i+1)).val(parseInt(che.val()));
     // } //for (var i=0;i<6;i++)

     // $("input[name=progress1]").change(function(){
     //      var che1=$("input[name=progress1]:checked");
     //      $(".input1").val((che1.val()));
     // });
     
     for(var i=0;i<6;i++){
          $(".input"+(i+1)).css("color","gray");     
     }

     $(".td_2").mouseenter(function(){
          fragmentGetValueEnter("up");
     }).mouseleave(function(){
         

     });
     $(".td_4").mouseenter(function(){
          fragmentGetValueEnter("left");
     }).mouseleave(function(){
         

     });
     $(".td_6").mouseenter(function(){
          fragmentGetValueEnter("right");
     }).mouseleave(function(){
      

     });
     $(".td_8").mouseenter(function(){
          fragmentGetValueEnter("down");
     }).mouseleave(function(){
          

     });
     function fragmentGetValueEnter(dir){
          if($("#demoAnime_img>div").is(":animated")){
               return false;
          }else{
               bindFragmentPlugin(dir,$(".input1").val(),$(".input2").val(),$(".input3").val(),$(".input4").val(),$(".input5").val(),$(".input6").val());
          }
     }

     //动画区
     function bindFragmentPlugin(dir,val1,val2,val3,val4,val5,val6){
         
          console.log(dir,val1,val2,val3,val4,val5,val6);
          $("#demoAnime_img").fragmentFly({
               image_url:"./img/demoAnime.png",
               cut_dir:"x",
               ave_part:10,
               rm_part:[4,7]
          },{
               
               anime_dir:dir,
               path:[val1,val2],
               time:[val3,val4],
               opacity:[val5,val6]

          });
     }
    
});


