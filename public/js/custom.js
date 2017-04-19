var FloatPlayer, ContentPlayer;
var FloatPlaying, ContentPlaying;
$(function(){ 
    
    window.onpopstate = function(event) { 
            //alert("event" + location.pathname );
            refresh(location.pathname);
    }
   
    $(this).on('click', 'a, button',function (e) {
            // custom handling here
            e.preventDefault();
            var href = $(this).attr('href');
            history.pushState("", "", href);
            
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
    return vars;
}

// 자체 새로고침 
function refresh(url)
{
    var url = fetch(url);
    if (url != null)
        if (url.indexOf('#') == -1)
        {
            //alert(url);
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






