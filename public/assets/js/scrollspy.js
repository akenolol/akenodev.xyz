/*-----------------------------------------------------------
* Template Name    : kevin | Responsive Bootstrap 4 Personal Template 
* Author           : theProger
* Version          : 1.0.0
* Created          : April 2020
* File Description : Scrollspy functions file for theme
*--
*/


"use strict";

function horizontal_header_style() {
    var pressed =  $(".button-toggler").hasClass('pressed') ? true : false;

    if ( $(window).scrollTop() < parseInt( window.innerHeight * 0.12 ) ) {
        $('header.mobile-header').addClass('transparent_header');
        if(!pressed)
        {
            if( $('header.horizontal_header').hasClass('transparentOnScroll') )
            {
                $('header.horizontal_header .header-ins').addClass('transparent_header');
            }
            
        }
     }else{
        $('header.horizontal_header .header-ins').removeClass('transparent_header');
        $('header.mobile-header').removeClass('transparent_header');
    }
}

$(document).ready(function(){

    horizontal_header_style();

    $(window).on('scroll', function () {
        /**Fixed header**/
        horizontal_header_style();
    });
    

    $('a[href^="#"]:not([href="#"]').on('click', function(event){
        var $anchor = $(this);
        var offset = parseInt($('body').data('offset'));
        $('html, body').stop().animate({
            
            scrollTop: ( $($anchor.attr('href')).offset().top ) - ( offset - 1 )

        }, 1500, 'easeInOutQuart');
        event.preventDefault();
    });

    
    
})