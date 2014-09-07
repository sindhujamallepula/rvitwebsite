/*
    File Name: script.js
    by Tolga Can
    RT-Theme 18
*/

/* ******************************************************************************* 

	IMAGE PRELOAD v1.5  - https://github.com/farinspace/jquery.imgpreload  

********************************************************************************** */  
if("undefined"!=typeof jQuery){(function(a){a.imgpreload=function(b,c){c=a.extend({},a.fn.imgpreload.defaults,c instanceof Function?{all:c}:c);if("string"==typeof b){b=new Array(b)}var d=new Array;a.each(b,function(e,f){var g=new Image;var h=f;var i=g;if("string"!=typeof f){h=a(f).attr("src")||a(f).css('background-image').replace(/^url\((?:"|')?(.*)(?:'|")?\)$/mg, "$1");i=f}a(g).bind("load error",function(e){d.push(i);a.data(i,"loaded","error"==e.type?false:true);if(c.each instanceof Function){c.each.call(i)}if(d.length>=b.length&&c.all instanceof Function){c.all.call(d)}a(this).unbind("load error")});g.src=h})};a.fn.imgpreload=function(b){a.imgpreload(this,b);return this};a.fn.imgpreload.defaults={each:null,all:null}})(jQuery)}



/* ******************************************************************************* 

	RETINA LOGO

********************************************************************************** */  
(function($){
	"use strict";
	if(window.devicePixelRatio > 1){ 
			var normal_size_logo = $("#logo img:first-child"); 
			var retina_logo = $("#logo img:first-child").attr("data-retina"); 
 
			if( retina_logo != "" ){
				$(normal_size_logo).imgpreload({
					all: function(){ 
						jQuery('#logo img:first-child').css({"width":normal_size_logo.width(),"height":normal_size_logo.height()}).attr("src", retina_logo);
					}
				});				
			}
	} 
})(jQuery); 


/* ******************************************************************************* 

	CHECK MOBILE

********************************************************************************** */
(function($){
	"use strict";
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$("body").addClass("mobile_device");
	}
})(jQuery);  


/* ******************************************************************************* 

	MULTI COLUMN MENUS

********************************************************************************** */  

(function($){
	"use strict";
 
	var top_level_items = $("#navigation > li.multicolumn");   
	var column_count = 5;

	top_level_items.each(function(){

		column_count = $(this).attr("data-column-size");				
		var $sub_menu = $(this).find("ul:eq(0)");
		$sub_menu.find("ul").removeClass("sub-menu"); 

		if( $sub_menu.length >0 ){
			$("<div class='multicolumn-holder'></div>").appendTo($(this));

			var $lists = $sub_menu, group;
			while( ( group = $lists.find('> li:lt('+column_count+')').remove() ).length){
				$('<ul/>').append(group).appendTo($(this).find(".multicolumn-holder"));
			}
			$lists.remove();				
		} 
	});

})(jQuery); 


/* ******************************************************************************* 

	RT Fixed Rows  

********************************************************************************** */

//RT Fixed Rows  
(function($){
	"use strict";

    $.fn.rt_fixed_rows = function(options) {

	$(this).find('> .box').removeAttr('style');
	
	if( $(window).width() < 768 ){
		return false;
	}

    var settings = $.extend({}, $.fn.rt_fixed_rows.defaults, options);
 	var fixed_rows = $(this);
		fixed_rows.each(function(){
			$(this).find('> .box').css({'min-height':$(this).height() });
		});  
	}; 

	//run the script
	$(window).on('load resize', function() {  
		$('.extra_paddings > .row').rt_fixed_rows();
		$('.row.with_borders').rt_fixed_rows();	
	});

})(jQuery);


/* ******************************************************************************* 

	HOVER EFFECT

********************************************************************************** */  
(function($){
  	"use strict";
	$(window).load(function() {
		$(".with_effect > .box").on("mouseover mouseleave",function(event) { 
			if(event.type == "mouseover"){
				$(this).find(".product_info").slideDown();  
			}

			if(event.type == "mouseleave"){
				$(this).find(".product_info").stop().slideUp(); 
			}

		});
	});
		   
})(jQuery);  

/* ******************************************************************************* 

	MOBILE MENU

********************************************************************************** */  
(function($){
  	"use strict";
	$(window).load(function() {
		$("#mobile_bar .mobile_menu_control").on("click",function() {

			$("#header .sticky-wrapper, .nav_shadow").toggleClass("active"); 

			if( $("#header .sticky-wrapper").hasClass("active") || $(".nav_shadow").hasClass("active") ){
				$(this).removeClass("icon-menu").addClass("icon-menu-outline");

				//close the mobile tools bar if active
				if( $("#top_bar").hasClass("active") ){
					$("#mobile_bar .top_bar_control").trigger("click");
				}				
			}else{
				$(this).removeClass("icon-menu-outlineu").addClass("icon-menu"); 
			}

		});
	});
		   
})(jQuery);  


/* ******************************************************************************* 

	MOBILE TOOLS ICON

********************************************************************************** */  
(function($){
	"use strict";
	$(window).load(function() {
		$("#mobile_bar .top_bar_control").on("click",function() {

			$("#top_bar").toggleClass("active");  

			if( $("#top_bar").hasClass("active") ){
				$(this).removeClass("icon-cog").addClass("icon-up-open");

				//close the mobile menu if active
				if( $("#header .sticky-wrapper").hasClass("active") || $(".nav_shadow").hasClass("active") ){
					$("#mobile_bar .mobile_menu_control").trigger("click");
				}				
			}else{
				$(this).removeClass("icon-up-open").addClass("icon-cog");
			}

		});
	});
		   
})(jQuery);  


/* ******************************************************************************* 

	START CAROUSELS

********************************************************************************** */    
 
(function($){
	"use strict";
	$.fn.rt_start_carousels = function(items,style) {

		var change_width;
		var new_width;
		var autoHeight_;
		var add;
		var parent_holder;   
		var sidebar_element;
		var carousel_holder = $(this);					

		if( style != "rounded_carousel" ){
			//change holder width
			change_width = carousel_holder.width( carousel_holder.width() + 20 );
			new_width = carousel_holder.width();

			//change margin
			if( $("body").hasClass("rtl") ){//rtl language	
				carousel_holder.css({ "marginRight" : "-10px" });					
			}else{
				carousel_holder.css({ "marginLeft" : "-10px" });						
			}
		} 

		//auto height
		if( items == 1 ){
			autoHeight_ = true;
		}else{
			autoHeight_ = false;
		}

		//check if this element in a floating sidebar
		if( carousel_holder.parents(".sidebar.sticky").length > 0 ){
			autoHeight_ = false;
		} 

		//start carousel
		var carousel = carousel_holder.find(".owl-carousel"); 

		carousel.owlCarousel({   
			autoHeight: autoHeight_,
			items: items,
			itemsDesktop: false,
			itemsDesktopSmall : [768,items],
			itemsTablet: [767,1], 
			itemsMobile: [479,1],
			navigation : true,
			pagination: false,
			navigationText : ["<span class=\"icon-left-open\"></span>","<span class=\"icon-right-open\"></span>"],
			rewindNav : true,
			lazyLoad : true,
			scrollPerPage : false,				 
			slideSpeed : 400,
			paginationSpeed : 600,
			responsive: true,
			responsiveRefreshRate: 10,
			responsiveBaseWidth:window,
			autoPlay: 12000, // 12 seconds

			afterUpdate:function(){ //fix controller positions 

				if( style != "rounded_carousel" ){
					//change holder width
					change_width = 0;
					carousel_holder.removeAttr("style");

					change_width = carousel_holder.width( carousel_holder.width() + 20 );
					new_width = carousel_holder.width();

					//change margin
					if( $("body").hasClass("rtl") ){//rtl language	
						carousel_holder.css({ "marginRight" : "-10px" });					
					}else{
						carousel_holder.css({ "marginLeft" : "-10px" });						
					}
				}

			},

			afterInit:function(){ //fix controller positions
				add = 42; 				
 				parent_holder = carousel.parents(".carousel-holder:eq(0)");

				if( parent_holder.hasClass("with_heading") ){
					if( parent_holder.hasClass("rounded_carousel_holder") ){
						add = add + 10;
					} 
					carousel.find(".owl-controls").css({"top": -1 * (  add + ( ( parent_holder.prev(".title_line").height() - 25 ) / 2 ) ) +"px"});
				}	

			}
		});
	}; 	

})(jQuery); 


/* ******************************************************************************* 

	FIX TOP BAR SEARCH FORM WIDTH

********************************************************************************** */    
 
(function($){
	"use strict";
	if( $("#top_search_field").length > 0 ){
		var value_length = $("#top_search_field").val().length;
		var isiPad = navigator.userAgent.match(/iPad/i) != null;
		var add_value; 

		if( isiPad ){
			add_value = value_length;

		}else{
			add_value = value_length - 2;
		}

		if( value_length > 4 ){
			$("#top_search_field").attr("size", add_value );	
		}
 	}
})(jQuery); 


/* ******************************************************************************* 

	CUSTOM SELECT BOXES

********************************************************************************** */    
 
(function($){
	"use strict";

	$(window).load(function(){
	if ( $.isFunction($.fn.customSelect) ) {
		$('.orderby, .variations select, .widget .menu.dropdown-menu').customSelect( { customClass: "wooselect" } );
	}
});
 
})(jQuery); 


/* ******************************************************************************* 

	MOBILE NAVIGATION

********************************************************************************** */    
(function($){
	"use strict";
	$('#MobileMainNavigation').change(function() {	
		window.location.href = $(this +'option:selected').val();
	});
})(jQuery); 


/* ******************************************************************************* 

	TABLET NAVIGATION FIX FOR DEACTIVE STATE

********************************************************************************** */    
(function($){
	"use strict";
	$("#container").on("click",function() { 
		return true;
	});
})(jQuery); 


/* ******************************************************************************* 

	SLIDE TO TOP

********************************************************************************** */  
(function($){
	"use strict";
	$(".line span.top").click(function() {
		$('html, body').animate( { scrollTop: 0 }, 'slow' );
	});
})(jQuery); 


/* ******************************************************************************* 

	LIGHTBOX PLUGIN

********************************************************************************** */    
(function($){
	"use strict";
	if ($.jackBox){
		$(".lightbox_[data-group]").jackBox("init", {baseName: rt_theme_params["rttheme_template_dir"] +"/js/lightbox", className: ".lightbox_", deepLinking : false, showInfoByDefault: true});  
	}
})(jQuery); 


/* ******************************************************************************* 

	PLAYER PLUGIN

********************************************************************************** */    
(function($){
	"use strict";
 	if(typeof mejs != 'undefined') {
 		$('.progression-single').css({width:"100%",height:"100%"});
		$('.progression-single').mediaelementplayer({ 
			startVolume: 0.5, // initial volume when the player starts
			features: ['playpause','current','progress','duration','tracks','volume','fullscreen']
		});
  	}
})(jQuery); 


/* ******************************************************************************* 

	RT form field - text back function

********************************************************************************** */  

(function($){
	"use strict";
	var val;
	var form_inputs=$(".showtextback");

	form_inputs.each(function(){
	
		$(this).focus( function()
		{
			val = $(this).val();
			if ($(this).attr("alt") != "0"){
			    $(this).attr("alt",$(this).attr("value")); 
			    $(this).attr("value","");
			}
		});
	
		$(this).blur( function(){
			if ($(this).attr("alt") != "0"){
				val = $(this).val(); 
				if (val == '' || val == $(this).attr("alt")){
				    $(this).attr("value",$(this).attr("alt"));
				}
			}
		});
	
		$(this).keypress( function(){  
			$(this).attr("alt","0");	    
		});                 
	});  

})(jQuery); 

/* ******************************************************************************* 

	JQUERY TABS

********************************************************************************** */  
(function($){
	"use strict";
    $("ul.tabs").tabs("> .panes > .pane", {effect: 'fade'});
})(jQuery);


/* ******************************************************************************* 

	SEARCH FIELD ALIGNMENT

**********************************************************************************  
(function($){
	"use strict";
	$(window).load(function() { 
		var new_search_location = ( $('#navigation_bar').width() - $('#navigation').width() - 118 ) / 2; 
		if(new_search_location<60) $("#navigation_bar .search-bar").css("right",""+new_search_location+"px");   
	}); 
})(jQuery); 
*/ 


/* ******************************************************************************* 

	SUBMIT SEARCH FORMS

********************************************************************************** */  
(function($){
	"use strict";
	$("#menu_search .icon-search-1, #top_search_form .icon-search").on("click",function() {  
	    $(this).parents("form:eq(0)").submit(); 
	}); 
})(jQuery); 


/* ******************************************************************************* 

	CLOSE INFO BOX

********************************************************************************** */  
(function($){
	"use strict";
	$(document.body).on("click",".info_box .icon-cancel",function() { 
	    $(this).parent(".info_box").fadeOut();
	}); 
})(jQuery); 


/* ******************************************************************************* 

	FIX FEATURES COLUMN POSITION

********************************************************************************** */  
 
(function($){
	"use strict"; 
	var features;
	var table = $(".pricing_table.compare");

	$(table).each(function(i){

		var start_position_element = $(this).find(".start_position");

		var features_list = $(this).find(".table_wrap.features ul"); 

		var new_offset =  start_position_element.offset().top - $(this).offset().top; 

		features_list.css("top",new_offset-1);
	});


	//copy features to each column for mobile
	$(table).each(function(){

		features=[];
		//createa features array from the first row
		$(this).find(".table_wrap.features li").each(function(){
			features.push( $(this).html() );
		});

	});


	$(table).find(".table_wrap").each(function(i){

		if( $(this).hasClass("features") == "" ){
			var i = 0;
			$(this).find("li").each(function(){
				$(this).attr("data-feature",features[i]); 
			i++;
			});
		} 
	});
})(jQuery); 
 

/* ******************************************************************************* 

	FORM VALIDATION

********************************************************************************** */  
jQuery(function($){ 
	"use strict";
	// show a simple loading indicator
	var loader = $('<img src="'+rt_theme_params["rttheme_template_dir"]+'/images/loading.gif" alt="..." />').appendTo(".loading");
		loader.hide(); 	

	$(".validate_form").each(function(){ 	
		var result = $(this).parents(".contact_form").find(".result");
		
		if( $.isFunction($.fn.validate) ) {
			$.validator.messages.required = "";
			var v = $(this).validate({
			      submitHandler: function(form) {
			              $(form).ajaxSubmit({
	                      	target: result,
							beforeSubmit:  function() {loader.show()},
							url: rt_theme_params["ajax_url"],
							data: { action: 'rt_ajax_contact_form' },
							success:   function() {loader.hide()}
		              		});
			      }
			});

		} 
	});
});



/* ******************************************************************************* 

	TOGGLE - ACCORDION

********************************************************************************** */  
(function($){
	"use strict";

     	$(".rt-toggle .toggle-content").hide(); 
		$(".rt-toggle .open .toggle-content").show();  
     	
     	$(".rt-toggle ol li .toggle-head").click(function(){ 
 
     		if($(this).parent("li").hasClass("open")){ 
	     		$(this).parent("li").removeClass("open").find(".toggle-content").stop().slideUp(300);  
     		}else{
	  	  		$(this).parents("ol").find("li.open").removeClass("open").find(".toggle-content").stop().slideUp(300);  
	  	  		$(this).parent("li").addClass("open").find(".toggle-content").stop().slideDown(300, "easeInQuad");	
	  	  	} 
	 	});

})(jQuery); 


/* ******************************************************************************* 

	STICKY NAV

********************************************************************************** */  

(function($){
	"use strict";

		$(window).load(function() {	
			if( $(window).width() > 1024 ){ //window width bigger than 1024
				$('.nav_shadow.sticky').waypoint('sticky', {  
					offset: -80 // Apply "stuck" when element 30px from top 
				});  
			}
		});

})(jQuery); 

/* ******************************************************************************* 

	TOOLTIPS

********************************************************************************** */  
(function($){
	"use strict";
 
	if( $.isFunction($.fn.colorTip) ) {
		$('.j_ttip').colorTip({color:''});
	}

})(jQuery); 


/* ******************************************************************************* 

	MAKE CONTENT HEIGHT EQUAL TO SIDEBAR

********************************************************************************** */  
 
(function($){
	"use strict";

	var $sidebar = jQuery(".sidebar");    

	$sidebar.each(function(){
		var sidebarH = $(this).height();
		var parentContent = $(this).prev(".content");  
		var parentContentHeight = parentContent.height();  
		var the_heigtest_part = Math.max(0,parentContentHeight,sidebarH);
		parentContent.css("min-height",the_heigtest_part);

	});

})(jQuery); 



/* ******************************************************************************* 

	CHROME FIXED BACKGROUND FIX

	Fixes Chrome bug when css animations used inside .top_content background-attachment:fixed redrawing
	This will be reemoved once Chrome fixes its bug.
********************************************************************************** */  
(function($){ 
	"use strict";

	if (/chrome/.test(navigator.userAgent.toLowerCase())) {
		$(".content_block_background").each(function() {		
			$(this).css("background-attachment", "scroll");			
		});  
	}
})(jQuery); 


/* ******************************************************************************* 

	RT GOOGLE MAPS

********************************************************************************** */  
  
(function($){
	"use strict";

	$.rt_maps = function(el, locations, zoom){

		var base = this; 
		base.init = function(){ 
			// initialize google map
			if(locations.length>0) google.maps.event.addDomListener(window, 'load', $.fn.rt_maps());  

		};
 
		if(locations.length>0) base.init();
	}; 

	$.fn.rt_maps = function(locations, zoom){		 

		var map_id = $(this).attr("id");  
 
 		//holder height
		var height = $('[data-scope="#'+map_id+'"]').attr("data-height");   

		if ( height > 0 ){
			$(this).css({'height':height+"px"});
		}

 		//api options
		var myOptions = {
			zoom: zoom,
			panControl: true,
			zoomControl: true,
			scaleControl: true,			
			streetViewControl: false,
			overviewMapControl: false,
			scrollwheel : false,
			navigationControl: true,
			center: new google.maps.LatLng(0, 0),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}			 
 
		var map = new google.maps.Map( document.getElementById(map_id), myOptions);		
	  	$.fn.setMarkers(map, locations);

	  	$.fn.fixTabs(map,map_id,zoom);
	};

	$.fn.setMarkers = function (map, locations) {
		 

		if(locations.length>1){
			var bounds = new google.maps.LatLngBounds();	 
		}else{
		    var center = new google.maps.LatLng(locations[0][1], locations[0][2]);
		    map.panTo(center);			
		}


		for (var i = 0; i < locations.length; i++) {
			if (locations[i] instanceof Array) {
				var location = locations[i];
				var myLatLng = new google.maps.LatLng(location[1], location[2]);
				var marker = new google.maps.Marker({
					position: myLatLng,
					map: map,
					animation: google.maps.Animation.DROP,
					draggable: false,
					title: location[0]
				});

				$.fn.add_new_event(map,marker,location[4]);
				if(locations.length>1) bounds.extend(myLatLng);
			}
		}

		if(locations.length>1)  map.fitBounds(bounds);
	};
	 
	$.fn.add_new_event = function (map,marker,content) {

	  if(content){
			var infowindow = new google.maps.InfoWindow({
				content: content,
				maxWidth: 300
			});
			google.maps.event.addListener(marker, 'click', function() {;
			infowindow.open(map,marker);
		});
	  }
	}; 

	$.fn.fixTabs = function (map,map_id,zoom) {
		var tabs_wrap = $("#"+map_id).parents(".tabs_wrap:eq(0)");  
		$(".tabs_wrap > ul > li").on("click",  { map: map } , function() { 
			var c = map.getCenter();  
			google.maps.event.trigger(map, 'resize'); 
			map.setZoom(zoom); 
			map.setCenter(c);  
		});
 
	};	
})(jQuery);

/* ******************************************************************************* 

	FLOATING SIDEBARS

********************************************************************************** */  
(function($){ 
	"use strict";

	//check woo chart widget
	if( $(".sidebar.sticky").find(".widget_shopping_cart").length > 0 ){
		return false;
	}

	//work if windown wider than 960
	if( $(window).width() > 1024 ){
	 	$(window).load(function(){
			var $window = $(window);
			var $sidebar = $(".sidebar.sticky"); 
			var $stickyHeaderFields = "#wpadminbar, .nav_shadow.stuck"; 
			

			setTimeout(function() { 
				$sidebar.each(function(){

					var $content_block = $(this).parents(".content_block:eq(0)");  	
					var $content = $(this).prev(".content");  
					var $sidebar = $(this);

					if($sidebar.length>0){
		 
		 				var sidebarHeight = $sidebar.height();   
						var contentHeight = $content.height();  
						var sidebar_position = $sidebar.position().top; 

						if(contentHeight>sidebarHeight){
							$window.scroll(function(event) {

								if( ! $sidebar.hasClass('fixed') ){
									$sidebar.addClass('fixed');
								}									
								
								var $content_block_top = $content_block.offset().top;
								var $addHeigth = 20; //20px padding from top

								//sticky fields on top 
								$($stickyHeaderFields).each(function(){ 
									$addHeigth = $addHeigth + $(this).height(); 
								}); 

					 			//sidebar new position
								var scrollTop = $window.scrollTop() + $addHeigth;    
								var topPosition = -1 * Math.min( 0 , $content_block_top - scrollTop );  						 
								var topPosition =  Math.min(  contentHeight - ( sidebar_position + ( sidebarHeight ) ) , topPosition );

								$sidebar.css('top', topPosition ); 	
								
							});
						}
					}
				});
			},1000);
		});
	}  
})(jQuery);