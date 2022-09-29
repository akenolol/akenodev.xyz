function fade(element)
{
    var o = 1;
    var t = setInterval(function()
    {
        if(o <= 0.1)
        {
            clearInterval(t);
            element.style.display = 'none';
        }
        element.style.opacity = o;
        o -= o * 0.1;
    },50);
}

window.addEventListener("load", function(event)
{
    fade(document.getElementById("preloader"));
});