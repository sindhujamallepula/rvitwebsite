/*
    File Name: demo.js
    by Tolga Can
    for RT-Theme 17
*/




//Cokies
function setCookie(cname,cvalue,exdays)
{
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
} 

function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++)
	{
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
return "";
}  


//languages
(function($){
	"use strict";
	$(".languages a").on('click', function(event) { 
		alert("RT-Theme 18 supports WPML plugin! The language list will be automatically added to your pages when you install the plugin. ");
	});
})(jQuery); 

//languages
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


(function($){
	"use strict";
	$("#logo_pos").on('change', function(event) {  

		var selectedValue = $('option:selected', this).val();
		var url = "";

		//refresh without other atts
		url = $(location).attr('protocol') + "//"+  $(location).attr('hostname') + $(location).attr('pathname') ;			
		//window.location= url;					

		if( $(location).attr('search') == "" ){
			url = $(location).attr('href') + "?logo_pos=" + selectedValue;
		}else{
			url = $(location).attr('href') + "&logo_pos=" + selectedValue;
		}

		var skin = getParameterByName("skin") ? "&skin="+ getParameterByName("skin") : ""; 

		url = $(location).attr('protocol') + "//"+  $(location).attr('hostname') + $(location).attr('pathname') + "?logo_pos="+ selectedValue + skin;

		window.location= url;	
	});
})(jQuery); 


(function($){
	"use strict";
	$("#layout").on('change', function(event) {  

		var selectedValue = $('option:selected', this).val(); 
 
		$("body").removeClass("boxed-body").removeClass("half-boxed").removeClass("wide").addClass(selectedValue);	
 
	});
})(jQuery); 

(function($){
	"use strict";
	$("#navigation_style").on('change', function(event) {  

		var selectedValue = $('option:selected', this).val(); 
 
		$("body").removeClass("menu-style-one").removeClass("menu-style-two").addClass(selectedValue);	
 
	});
})(jQuery); 

/*
//boxed & wide
(function($){
	"use strict";
	$(".layout_changer").on('click', function(event) { 

		var scope = $(this).attr("data-scope"); 

		$(".layout_changer").each(function(){
			$(this).removeClass("icon-check").addClass("icon-check-empty");
		});

		if(scope == "wide" ){
			$("body").removeClass("boxed").removeClass("half-boxed").removeClass("wide").addClass("wide");		
		}else if(scope == "half-boxed" ){
			$("body").removeClass("boxed").removeClass("half-boxed").removeClass("wide").addClass("half-boxed");					
		}else{
			$("body").removeClass("boxed").removeClass("half-boxed").removeClass("wide").addClass("boxed-body wide");
		}		

		$(this).addClass("icon-check").removeClass("icon-check-empty");

	});
})(jQuery); 
*/

//subs
(function($){
	"use strict";
	$(".sub_titles").on('click', function(event) { 

		var scope = $(this).attr("data-scope"); 

		if( $("#navigation_bar").hasClass("with_subs") ){
			$("#navigation_bar").removeClass("with_subs");
			$("body").removeClass("with_subs");
			$("#header .sticky-wrapper").removeAttr("style");
			$(this).addClass("icon-check-empty");
			$(this).removeClass("icon-check");
		}else{
			$("#navigation_bar").addClass("with_subs");
			$(this).addClass("icon-check");
			$(this).removeClass("icon-check-empty");
		}

	});
})(jQuery); 

 
//demo picker panel position
(function($){
		var picker_position = getCookie( "picker_position" );

		if( picker_position == "off" ){ 
			jQuery('.demo_changer').css({"left":"-210px"}).toggleClass("active");	 
		}

	jQuery('.demo_changer .demo-icon').click(function(){

		if(jQuery('.demo_changer').hasClass("active")){
			jQuery('.demo_changer').animate({"left":"-210px"},function(){
				jQuery('.demo_changer').toggleClass("active");
				setCookie("picker_position","off",365);
			});						
		}else{
			jQuery('.demo_changer').toggleClass("active");
			jQuery('.demo_changer').animate({"left":"0px"},function(){
				
				setCookie("picker_position","on",365);
			});			
		} 

	});
 
 	jQuery(window).load(function(){
	
 		if( picker_position == "" ){
			setTimeout(function() { 
				jQuery('.demo_changer').animate({"left":"-210px"},function(){
					jQuery('.demo_changer').toggleClass("active");
					picker_position = "off";
				});		
				setCookie("picker_position","off",365);
			},1500);
		}
	});
})(jQuery); 