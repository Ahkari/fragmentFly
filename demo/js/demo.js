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


	

});


