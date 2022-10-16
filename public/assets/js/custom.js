!function (n) { "use strict"; n((function () { })), n(window).on("load", (function () { })) }(jQuery);



function redirect(url) {

    if (!url) throw new Error("No URL provided.");

    if (window.confirm("You are being redirected to a third party website. Please be aware that we are not responsible for the content of that website. If you wish to continue, click OK.")) {
        window.location.href = url;
    }


}


function getCountry() {
    // Check if the user is from japan
    if (window.navigator.language === "jp") {
        return "JP";
    }
    // Check if the user is from the US
    if (window.navigator.language === "en") {
        return "US";
    }
}




document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    // var menu = document.createElement("div");
    // menu.id = "context-menu";
    // menu.style.position = "absolute";
    // menu.style.top = e.clientY + "px";
    // menu.style.left = e.clientX + "px";
    // menu.style.backgroundColor = "white";
    // menu.style.borderRadius = "5px";
    // menu.style.padding = "5px";
    // menu.style.maxWidth = "250px";
    // menu.style.maxHeight = "250px";
    // menu.style.overflow = "hidden";
    // menu.style.textOverflow = "ellipsis";
    // menu.style.whiteSpace = "nowrap";


    // var menuItems = [
    //     {
    //         label: "Discord",
    //         click: function () {
    //             window.location.href = "https://discord.gg/d9fd8CHWP3";
    //         }
    //     },
    //     {
    //         label: "Twitter",
    //         click: function () {
    //             window.location.href = "https://twitter.com/akeno_dev";
    //         }
    //     },
    // ]

    // menuItems.forEach((item) => {
    //     var menuItem = document.createElement("div");
    //     menuItem.style.padding = "5px";
    //     menuItem.style.cursor = "pointer";
    //     menuItem.innerText = item.label;
    //     menuItem.addEventListener("click", item.click);
    //     menu.appendChild(menuItem);
    // })

    // menu.appendChild(document.createElement("br"));


    // if (menuOpened) {
    //     document.getElementById("context-menu").remove();
    //     menuOpened = false;
    // }
    // else {
    //     var menuItem = document.createElement("div");
    //     menuOpened = true;
    // }

    // menuItem.style.padding = "5px";
    // menuItem.style.cursor = "pointer";
    // menuItem.innerText = "Close";
    // menuItem.addEventListener("click", function () {
    //     document.body.removeChild(menu);
    // });
    // menu.appendChild(menuItem);

    // document.body.appendChild(menu);
    // menu.style.display = "block";
});


$(document).ready(function () {
    var country = getCountry();

    if (country == "JP") {
        window.location.href = "https://jp.akenodyv.xyz";
    } 
    else if (country == "US") {
        return;
    }
})


