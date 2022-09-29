/*-----------------------------------------------------------
* Template Name    : RectCV - Personal Bootstrap 4 HTML Template
* Author           : Narek Sukiasyan
* Version          : 1.0.0
* Created          : May 2020
* File Description : Alert script file for theme
*--
*/

var alertTimeout,
    delay = 5000;

function remove_alert()
{
    clearTimeout(alertTimeout);
    alertTimeout = setTimeout(function()
    {
        $('.custom-alert').stop().fadeOut(function()
        {
            $(this).remove();
        })
    }, delay);
}
function custom_alert(message, type) 
{
    $('.custom-alert').remove();
    $alert = $('<div>'+message+'</div>');
    $alert.addClass("custom-alert");

    if(type == "success")
    {
        $alert.addClass("custom-alert-success"); 
    }

    if(type == "error")
    {
        $alert.addClass("custom-alert-warning"); 
    }

    $("body").append($alert);
    $alert.fadeIn(function(){
        remove_alert();
    });

   
}
