/*-----------------------------------------------------------
* Template Name    : RectCV - Personal Bootstrap 4 HTML Template
* Author           : Narek Sukiasyan
* Version          : 1.0.0
* Created          : April 2020
* File Description : Custom functions file for theme
*--
*/

"use strict";

jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ){
        this.addEventListener("touchstart", handle, { passive: true });
    }
};

//Scroll Bar Width Check Function

function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";
  
    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild (inner);
  
    document.body.appendChild (outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;
  
    document.body.removeChild (outer);
  
    return (w1 - w2);
};


//Init Template for Prelaoder

$('body').css({'margin-right': getScrollBarWidth() + "px"});
$('body').addClass('overflow-hidden');
$('header.navigation').css({'padding-right': getScrollBarWidth() + "px"});
$('.backgound-section').addClass('preload');

$(window).on("load", function(){
    
    
    setTimeout(function(){
        $("body").removeClass('overflow-hidden');
        $("body").removeAttr('style');
        $("header.navigation").removeAttr('style');
        $('.backgound-section').removeClass('preload');
    },400);

    //AOS

    AOS.init({
        once: true
    });

     //Input on Focus

    $('.form-control').on('focusin', function(){
        $(this).parent('.form-group').addClass('form-focused');
    });

    $('.form-control').on('focusout', function(){
        if($(this).val().length === 0){
            $(this).parent('.form-group').removeClass('form-focused');
        }
    });

    //Typed JS

    var typed = new Typed('.welcome-text-type', {
        strings: $('.welcome-text-type').data('options').split(","),
        typeSpeed: 90,
        backDelay: 2000,
        backSpeed: 40,
        loop: true
    });

    //Counter

    $('.tmcounter').each(function(){
        $(this).appear(function(){
            $(this).countTo();
        })
    });

    //Progress Bar

    $('.progress-bar').each(function(){
        $(this).appear(function(){

            $(this).css({
                width: $(this).data('percent') + "%"
            })

        });
    })

    //Parallax

    if($('#parallaxbackground').length != 0)
    {
        var backgroundp = document.getElementById('parallaxbackground');
        var parallaxInstance = new Parallax(backgroundp);
    }

    //Particle

    if($('#particlebackground').length != 0)
    {
        var config = $('#particlebackground').data('config');
        particlesJS.load('particlebackground', config);

    }




    

    // Mobile Menu Toggler

    $(".button-toggler").on("click", function(){
        $(this).hasClass('pressed') ? $(this).removeClass('pressed') : $(this).addClass('pressed');
        var pressed =  $(this).hasClass('pressed') ? true : false;
        var vertical_header = $('.navigation').hasClass('vertical_header') ? true : false;

        if(!vertical_header && pressed)
        {   
            if( $('header.horizontal_header').hasClass('transparentOnScroll'))
            {
                $('header.horizontal_header .header-ins').removeClass('transparent_header');
            }
            
            
        }else if(!vertical_header && !pressed && $(window).scrollTop() < 350)
        {
            if( $('header.horizontal_header').hasClass('transparentOnScroll'))
            {
                $('header.horizontal_header .header-ins').addClass('transparent_header');
            }
            
        }
        
        if(pressed && vertical_header)
        {
            $('.vertical_header').addClass('pressed');
            $('main').addClass('pressed');
            $('.mobile-header').addClass('pressed');
        }
        else
        {
            $('.vertical_header').removeClass('pressed');
            $('main').removeClass('pressed');
            $('.mobile-header').removeClass('pressed');

        }
    });

    $('.vertical_header ul li a').on('click', function(){
        $('.vertical_header').removeClass('pressed');
        $('main').removeClass('pressed');
        $('.mobile-header').removeClass('pressed'); 
        $(".button-toggler").removeClass('pressed');
    });

    $('.horizontal_header ul li a').on('click', function(){
        if(window.innerWidth < 992)
        {
            $(".button-toggler").click();
        }
        
    });

    // Popup Portfolio Section

    $(".portfolio-image").magnificPopup({
        type:"image",
        closeOnContentClick: true,
        gallery:{
            enabled: true,
            navigateByImgClick:true,
            preload:[0,1]
        }
    });

    $(".iframe_popup").magnificPopup({
        type: "iframe",
        closeBtnInside: false,
        iframe: {
            markup: '<div class="mfp-iframe-scaler">'+
                      '<div class="mfp-close"></div>'+
                      '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                    '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
          
                    id: 'v=',
          
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                },
                gmaps: {
                     index: '//maps.google.',
                    src: '%id%&output=embed'
                }
                },
          
            srcAction: 'iframe_src',
        }
        
    });

    // Return to top button

    $(window).scroll(function(){
        if($(this).scrollTop() >= 350) {
            $('#return-to-top').fadeIn(200);
        } else {
            $('#return-to-top').fadeOut(200);
        }
    });

    $('#return-to-top').on('click', function() {
        event.preventDefault();
        $('body,html').animate({
            scrollTop : 0
        }, 1500, 'easeInOutQuad');
    });

    // OWL Carousel

    $('#client_slider').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        dots: true,
        autoplayHoverPause: true,
        autoplaySpeed: 1000,
        navSpeed: 500,
        dotsSpeed: 500,
        dragEndSpeed: 500
    });

    

    

});
