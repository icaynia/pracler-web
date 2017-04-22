var FloatPlayer, ContentPlayer;
var FloatPlaying, ContentPlaying;
$(function(){ 
    
    window.onpopstate = function(event) { 
            refresh(location.pathname);
    }
   
    $(this).on('click', 'a, button',function (e) {
            // custom handling here
            e.preventDefault();
            var href = $(this).attr('href');
            history.pushState("", "", href);
            
            if (href)
            refresh(href);
    });




     
});
function youtube_setContentPlayer(code)
{
    ContentPlayer = new YT.Player('contentplayer', {
            videoId: code,
            events: {
                'onStateChange': ContentPlayerStateChange
            }
    });
}

function ContentPlayerStateChange(event)
{
    $(".floatplayerbox").empty();
}

function goto(url)
{
    var url = fetch(url);
    history.pushState("", "", url);
    refresh(url);
}

function youtube_content_to_float()
{
    $("div.youtube").appendTo("div.floatplayerbox");
}

function youtube_setContentPlayer_autoplay(code)
{
    $( "div.floatplayerbox" ).html('<div class="youtube"><iframe src="https://www.youtube.com/embed/'+code+'?autoplay=1" frameborder="0" allowfullscreen></iframe></div>');
}

function soundcloud_setContentPlayer_autoplay(code)
{
    $( "div.floatplayerbox" ).html('<div class="youtube"><iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/'+code+'&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe></div>');
}

function getUrlVars(url)
{
    var url = fetch(url);
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    if (!vars.v)
    {
        
        return "null";
    }
    else
    {
        return vars.v;
    }
}

function getUrlVars_soundcloud(url)
{
    var url = fetch(url);
    var hashes = url.split("soundcloud.com/");
    var va = hashes[1];
    if (va)
    {   
        return va;
    }
    else
    {
        return "null";
    }

}


// 자체 새로고침 
function refresh(url)
{
    var url = fetch(url);
    if (url != null)
        if (url.indexOf('#') == -1)
        {
            $('#main_content').load("/view"+url, function(responseText, statusText, xhr)
            {
                    if(statusText == "error")
                            $('#main_content').load("/view/404");
            });
        }
}



function fetch(str)
{
    return str.replace(/ /gi, '+');
}

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

function unfetch(str)
{
    return str.replaceAll('+', ' ');
}




