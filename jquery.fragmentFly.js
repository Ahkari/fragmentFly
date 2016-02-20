/*!
 * fragmentFly 1.0.1 
 * https://github.com/ahkari/fragmentFly
 * @license MIT licensed
 *
 * Copyright (C) 2015 
 */
(function( global, factory){
'use strict' ;
if ( typeof define === 'function' && define.amd ){
	define(['jquery'],function($){
		return factory( $, global, global.document, global.Math) ;
	}) ;
}else if(typeof exports !== 'undefined'){
	module.exports = factory(require('jquery'),global, global.document, global.Math) ;
}else{
	factory( jQuery, global, global.document, global.Math ) ;
}
})(typeof window !== 'undefined' ? window : this , function( $, window, document, Math, undefined){

'use strict' ;

//STATIC
var CARD_NAME = 'fragmentCard' ;

var AREA_WIDTH = 300 ;
var AREA_HEIGHT = 150 ;

var AREA_AVE_PART = 12 ;
var AREA_CUT_DIR = 'x' ;
var AREA_RM_PART = [ 2 , 3 ] ;

var CARD_OPACITY = [ 1 , 1 ] ;

var ANIME_DIR = 'down' ;
var ANIME_PATH = [ 500 , 800 ] ;
var ANIME_TIME = [ 1000 , 1300 ] ;

var ANIME_MODE_MAP = {
	'down' : {
		anime_dir_parm : 'top' ,
		animeDirFlag : 1 
	},
	'up' : {
		anime_dir_parm : 'top' ,
		animeDirFlag : 0 
	},
	'left' : {
		anime_dir_parm : 'left' ,
		animeDirFlag : 0 
	},
	'right' : {
		anime_dir_parm : 'left' ,
		animeDirFlag : 1
	}
} ;

/**
 * A jquery Card DOM Element.
 * It is the small element which will apply animation.
 * @class
 * @param name {String} The id for this Card element
 * @param texture {String} The texture for this Card element
 * @param indexPosition {Array} The index for this Card in his Area
 * @param styleOption {Object} The style for this Card
 */
function Card( name , texture , indexPosition , styleOption ){
	var dom = document.createElement( 'div' ) ;
	dom.style.position = 'absolute' ;
	dom.style.zIndex = 10 ;
	dom.style.opacity = styleOption.opacity_start ;
	dom.style.left = styleOption.left + 'px' ;
	dom.style.top = styleOption.top + 'px' ;
	dom.style.width = styleOption.width + 'px' ;
	dom.style.height = styleOption.height + 'px' ;

	//dom.style.background = 'url("' + texture + '") no-repeat -'+ styleOption.left+'px -'+styleOption.top+'px;';

	dom.style.backgroundImage = 'url(' + texture + ')' ;
	dom.style.backgroundRepeat ='no-repeat' ;
	dom.style.backgroundPositionX = '-' + styleOption.left + 'px' ;
	dom.style.backgroundPositionY = '-' + styleOption.top + 'px' ;

	dom.id = name + '_cardCopy_' + indexPosition[ 0 ] + '_' + indexPosition[ 1 ] ;

	return $( dom ) ;
}



//utils
var utils = {
	getRandom : function( n ){
		return Math.floor( Math.random() * n + 1 ) ;
	},
	getCurElement : function( dom , curName , positionIndex ){
		return dom.find( '#' + curName + '_cardCopy_' + positionIndex[ 0 ] + '_' + positionIndex[ 1 ] ) ;
	},
	imageLoad : function( imgUrl , callback , context ){
		var imgTmp = new Image() ;
		imgTmp.onload = function(){
			callback && callback.call( context ) ;
		} ;
		imgTmp.src = imgUrl ;
	},
} ;

$.fn.extend({
	"fragmentFly" : function( divisionSetting , animeSetting, callback ){
		//exist value
		if ( !divisionSetting ) {
			console.warn('Please confirm you have more than one valid arguments~' ) ;
			return ;
		}

		var url = divisionSetting.image_url ;
		if (  !(typeof url === 'string' && url.length !== 0 ) ){
			console.warn('You should have a valid image url address~');
            return ;
		}

		var cardDom = $( this ) ;

		var cardHeight = cardDom.length > 0 ? cardDom.height() : AREA_HEIGHT ;
		
		var cardWidth = cardDom.length >0 ? cardDom.width() : AREA_WIDTH ;
		
		var cardName = cardDom.attr('id') ? cardDom.attr('id') : CARD_NAME ;

		var cut_dir = divisionSetting.cut_dir ? divisionSetting.cut_dir : AREA_CUT_DIR ;

		var ave_part = divisionSetting.ave_part ? (divisionSetting.ave_part-0) : AREA_AVE_PART ;

		var rm_part = divisionSetting.rm_part ? divisionSetting.rm_part : AREA_RM_PART ;

		var opacity = (animeSetting && animeSetting.opacity ) ? animeSetting.opacity : CARD_OPACITY ;

		//undefined value
		var cardCopyObjects ,
			rm_part_min ,
			rm_part_max ,
			unitX ,
			unitY ,
			eachTitle ,
			randomPart ,
			opacity_start ,
			opacity_end ;

		rm_part_min = Number( rm_part[ 0 ] ) ;
		rm_part_max = rm_part.length === 1 ? Number( rm_part[ 0 ] ) : Number( rm_part[ 1 ] ) ;

        if ( cut_dir === 'x' ) {
        	unitX = cardWidth / ave_part ;
        } else {
        	unitY = cardHeight / ave_part ;
        }
        
        opacity_start = Number( opacity[ 0 ] ) ;
        opacity_end = opacity.length === 1 ? Number( opacity[ 0 ] ) : Number( opacity[ 1 ] ) ;

        //cache Value
        var randomArr = [] ;
        var creatTitleCopy = '' ;

        //cut operation
        // var $fragment = $( document.createDocumentFragment() ) ;
        for( var i = 0 ; i < ave_part ; i++ ){
        	randomPart = utils.getRandom( ( rm_part_max - rm_part_min ) + 1 ) + rm_part_min - 1 ;
        	if ( cut_dir === 'x' ){
        		unitY = cardHeight / randomPart ;
        	}else{
        		unitX = cardWidth / randomPart ;
        	}
        	randomArr.push( randomPart ) ;
        	
        	for ( var j = 0 ; j < randomPart ; j++ ){
        		var left ,
        			top ,
        			width ,
        			height ;

        		if ( cut_dir === 'x' ){
        			left = i * unitX ;
        			top = j * unitY ;
        			width = unitX ;
        			height = unitY ;
        		} else {
        			left = j * unitX ;
        			top = i * unitY ;
        			width = unitX ;
        			height = unitY ;
        		}

        		var styleStr = "style=\"position:absolute;z-index:10;opacity:"+opacity_start+";left:"+left+"px;top:"+top+"px;width:"+width+"px;height:"+height+"px;background:url("+url+") no-repeat -"+left+"px -"+top+"px;\"";
          
                eachTitle = "<div id=\""+cardName+"_cardCopy_"+i+"_"+j+"\" "+styleStr+"></div>";
                creatTitleCopy += eachTitle;

        		// $fragment.append( new Card(  CARD_NAME , url , [ i , j ] , {
        		// 	opacity_start : opacity_start ,
        		// 	left : left ,
        		// 	top : top ,
        		// 	width : width ,
        		// 	height : height ,
        		// } ) )  ;
        	}
        }
        // cardDom.html( $fragment ) ;

        cardDom.html(creatTitleCopy);

        //value
        var anime_dir = animeSetting.anime_dir ? animeSetting.anime_dir : ANIME_DIR ;
        
        var path = animeSetting.path ? animeSetting.path : ANIME_PATH ;
        
        var time = animeSetting.time ? animeSetting.time : ANIME_TIME ;

        var anime_dir_parm = ANIME_MODE_MAP[ anime_dir ].anime_dir_parm ;
        
        var	animeDirFlag = ANIME_MODE_MAP[ anime_dir ].animeDirFlag ;

        var path_min ,
			path_max ,
			time_min , 
			time_max ;

		path_min = Number( path[ 0 ] ) ;
		path_max = path.length === 1 ? Number( path[ 0 ] ) : Number( path[ 1 ] ) ;

	    time_min = Number( time[ 0 ] ) ;
	    time_max = path.length === 1 ? Number( time[ 0 ] ) : Number( time[ 1 ] ) ;

	    //cache value
	    var timeRandomArr = [] ;
	    var maxTimeMark ; //Max Time Element Index

	    for ( var i_time = 0 ; i_time < ave_part ; i_time++ ){
	    	var ranShift = randomArr[ i_time ] ;
	    	for ( var j_time = 0 ; j_time < ranShift ; j_time++ ){
	    		var time_store = utils.getRandom( time_max - time_min + 1 ) + time_min - 1 ;
	    		if ( timeRandomArr.length === 0 ){
	    			maxTimeMark = 0 ;
	    		} else if ( timeRandomArr[ maxTimeMark ] <= time_store ){
	    			maxTimeMark = timeRandomArr.length ;
	    		}
	    		timeRandomArr.push( time_store ) ;
	    	}
	    }

	    //countValue
	    var timeCount = 0 ;
	    var callbackMax = $.noop ;

	    utils.imageLoad( url , function(){

		    for ( var i = 0 ; i < ave_part ; i++ ){
		    	var randomPartShift = randomArr.shift() ;
		    	for ( var j =0 ; j < randomPartShift ; j++ ){
		    		var randomY = utils.getRandom( path_max - path_min + 1 ) + path_min - 1 ;

		    		var title_y_path = '+=' + randomY.toString() + 'px' ;
		    		var title_y_path_ready = "-=" + randomY.toString() + "px" ;

		    		var time = timeRandomArr[ timeCount ] ;
		            if ( timeCount === maxTimeMark ){
		                callbackMax = callback ;
		            } else {
		            	callbackMax = $.noop ;
		            }
		            timeCount++;

		            var $curEle = utils.getCurElement( cardDom , cardName , [ i, j ] ) ;
		            if ( anime_dir_parm === "top" ){
		                if ( animeDirFlag ===  1 ){
		                    $curEle
		                        .animate({
		                        top : title_y_path_ready ,
		                        opacity : opacity_start
		                    },0)
		                        .animate({
		                        top : title_y_path ,
		                        opacity : opacity_end  
		                    }, time , "swing" , callbackMax ) ;
		                }else if( animeDirFlag === 0 ){
		                    $curEle
		                        .animate({
		                        top : title_y_path ,
		                        opacity : opacity_start
		                    },0)
		                        .animate({
		                        top : title_y_path_ready ,
		                        opacity : opacity_end
		                    }, time , "swing" , callbackMax ) ;
		                }
		            }   //if (anime_dir_parm=="top")
		            else if( anime_dir_parm === "left" ){
		                if ( animeDirFlag === 1 ){
		                    $curEle
		                        .animate({
		                        left : title_y_path_ready ,
		                        opacity : opacity_start
		                    },0)
		                        .animate({
		                        left : title_y_path ,
		                        opacity : opacity_end
		                    }, time , "swing" , callbackMax ) ;
		                }else if( animeDirFlag === 0 ){
		                    $curEle
		                        .animate({
		                        left : title_y_path ,
		                        opacity : opacity_start
		                    },0)
		                        .animate({
		                        left : title_y_path_ready ,
		                        opacity : opacity_end
		                    }, time , "swing" , callbackMax ) ;
		                }
		            } 
		    	}
		    }
		} , this ) ; //fix bind not support in IE8
	    // }.bind( this ) ) ; 
	}
})





})