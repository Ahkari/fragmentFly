# fragmentFly
jquery动画插件,对指定元素进行图像分割碎片动画

###这里是主页 [fragmentFly](http://example.com/"碎片飞行动画").

>####快速上手:
>
>  `$("#fragment_title").fragmentFly({image_url:"./img/title.png"},{});`
>
>####参数说明:
>
>  `$("#fragment_title").fragmentFly({`
>
>     `image_url:"./img/title.png",`    //背景图路径，当前目录为元素所在的html目录
>
>      `cut_dir:"x",`    //可选"x"或"y"，默认均分x方向
>
>     `ave_part:12,`    //均分cut_dir方向，默认切割成12份
>
>     `rm_part:[2,3]`   //非cut_dir方向上随机切割，默认最小2份，最多3份 
>
>  `},{`
>
>     `anime_dir:"down",`   //切割子元素动画运行方向，可选"up","down","left","right"，默认为down
>
>     `path:[500,800],`     //切割子元素动画路长，默认路径最短500px，最长800px
>
>     `time:[1000,1300],`   //切割子元素动画时长，默认时长最短1000ms，最长1300ms
>
>     `opacity:[1,1]`       //切割子元素透明度变化，默认初始为1，结束为1(即无渐变)
>
>  `},`
>
>    `callback`    //回调函数,在最后一个动画完成后立马触发,不一定是time的最大值
>
>  `};`
