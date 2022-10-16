
!function(n){"use strict";n((function(){})),n(window).on("load",(function(){}))}(jQuery);



function redirect(url) {

    if (!url) throw new Error("No URL provided.");

    if (window.confirm("You are being redirected to third party website. Please be aware that we are not responsible for the content of that website. If you wish to continue, click OK.")) {
        window.location.href = url;
    }
    
}