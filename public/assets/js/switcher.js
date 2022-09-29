/*-----------------------------------------------------------
* Template Name    : RectCV - Personal Bootstrap 4 HTML Template
* Author           : Narek Sukiasyan
* Version          : 1.0.0
* Created          : May 2020
* File Description : Switcher functions file for theme
*--
*/



$(function(){

    $('.switcher-button').on('click', function(){
      
        $('#color-switcher').hasClass('open-switcher') ? $('#color-switcher').removeClass('open-switcher') :  $('#color-switcher').addClass('open-switcher');
         
    });

    $('.swtich-color').on('click', function(event){

        $('.swtich-color').removeClass('active');

        $(this).addClass('active');

        $('#optional-color').attr('href', $(this).data('path'));

        $('.switcher-button').click();

        event.preventDefault();
    });

    $('.switch-layout').on('click', function(event){

        $('.switch-layout').removeClass('active');
        
        $(this).addClass('active');

        $('#optional-theme').attr('href', $(this).data('layout'));

        $('.switcher-button').click();

        event.preventDefault();

    });



})