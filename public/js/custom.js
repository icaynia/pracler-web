var FloatPlayer, ContentPlayer;
var FloatPlaying, ContentPlaying;

var nowplaying;
$(function(){ 
    nowplaying = new NowPlaying();

    var SC=SC||{};SC.Widget=function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={exports:{},id:r,loaded:!1};return n[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var e={};return t.m=n,t.c=e,t.p="",t(0)}([function(n,t,e){function r(n){return!!(""===n||n&&n.charCodeAt&&n.substr)}function o(n){return!!(n&&n.constructor&&n.call&&n.apply)}function i(n){return!(!n||1!==n.nodeType||"IFRAME"!==n.nodeName.toUpperCase())}function a(n){var t,e=!1;for(t in b)if(b.hasOwnProperty(t)&&b[t]===n){e=!0;break}return e}function s(n){var t,e,r;for(t=0,e=I.length;t<e&&(r=n(I[t]),r!==!1);t++);}function u(n){var t,e,r,o="";for("//"===n.substr(0,2)&&(n=window.location.protocol+n),r=n.split("/"),t=0,e=r.length;t<e&&t<3;t++)o+=r[t],t<2&&(o+="/");return o}function c(n){return n.contentWindow?n.contentWindow:n.contentDocument&&"parentWindow"in n.contentDocument?n.contentDocument.parentWindow:null}function l(n){var t,e=[];for(t in n)n.hasOwnProperty(t)&&e.push(n[t]);return e}function d(n,t,e){e.callbacks[n]=e.callbacks[n]||[],e.callbacks[n].push(t)}function E(n,t){var e,r=!0;return t.callbacks[n]=[],s(function(t){if(e=t.callbacks[n]||[],e.length)return r=!1,!1}),r}function f(n,t,e){var r,o,i=c(e);return!!i.postMessage&&(r=e.getAttribute("src").split("?")[0],o=JSON.stringify({method:n,value:t}),"//"===r.substr(0,2)&&(r=window.location.protocol+r),r=r.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),void i.postMessage(o,r))}function p(n){var t;return s(function(e){if(e.instance===n)return t=e,!1}),t}function h(n){var t;return s(function(e){if(c(e.element)===n)return t=e,!1}),t}function v(n,t){return function(e){var r=o(e),i=p(this),a=!r&&t?e:null,s=r&&!t?e:null;return s&&d(n,s,i),f(n,a,i.element),this}}function S(n,t,e){var r,o,i;for(r=0,o=t.length;r<o;r++)i=t[r],n[i]=v(i,e)}function R(n,t,e){return n+"?url="+t+"&"+g(e)}function g(n){var t,e,r=[];for(t in n)n.hasOwnProperty(t)&&(e=n[t],r.push(t+"="+("start_track"===t?parseInt(e,10):e?"true":"false")));return r.join("&")}function m(n,t,e){var r,o,i=n.callbacks[t]||[];for(r=0,o=i.length;r<o;r++)i[r].apply(n.instance,e);(a(t)||t===L.READY)&&(n.callbacks[t]=[])}function w(n){var t,e,r,o,i;try{e=JSON.parse(n.data)}catch(a){return!1}return t=h(n.source),r=e.method,o=e.value,(!t||A(n.origin)===A(t.domain))&&(t?(r===L.READY&&(t.isReady=!0,m(t,C),E(C,t)),r!==L.PLAY||t.playEventFired||(t.playEventFired=!0),r!==L.PLAY_PROGRESS||t.playEventFired||(t.playEventFired=!0,m(t,L.PLAY,[o])),i=[],void 0!==o&&i.push(o),void m(t,r,i)):(r===L.READY&&T.push(n.source),!1))}function A(n){return n.replace(Y,"")}var _,y,O,D=e(1),b=e(2),P=e(3),L=D.api,N=D.bridge,T=[],I=[],C="__LATE_BINDING__",k="http://wt.soundcloud.dev:9200/",Y=/^http(?:s?)/;window.addEventListener?window.addEventListener("message",w,!1):window.attachEvent("onmessage",w),n.exports=O=function(n,t,e){if(r(n)&&(n=document.getElementById(n)),!i(n))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(e=e||{},n.src=R(k,t,e));var o,a,s=h(c(n));return s&&s.instance?s.instance:(o=T.indexOf(c(n))>-1,a=new _(n),I.push(new y(a,n,o)),a)},O.Events=L,window.SC=window.SC||{},window.SC.Widget=O,y=function(n,t,e){this.instance=n,this.element=t,this.domain=u(t.getAttribute("src")),this.isReady=!!e,this.callbacks={}},_=function(){},_.prototype={constructor:_,load:function(n,t){if(n){t=t||{};var e=this,r=p(this),o=r.element,i=o.src,a=i.substr(0,i.indexOf("?"));r.isReady=!1,r.playEventFired=!1,o.onload=function(){e.bind(L.READY,function(){var n,e=r.callbacks;for(n in e)e.hasOwnProperty(n)&&n!==L.READY&&f(N.ADD_LISTENER,n,r.element);t.callback&&t.callback()})},o.src=R(a,n,t)}},bind:function(n,t){var e=this,r=p(this);return r&&r.element&&(n===L.READY&&r.isReady?setTimeout(t,1):r.isReady?(d(n,t,r),f(N.ADD_LISTENER,n,r.element)):d(C,function(){e.bind(n,t)},r)),this},unbind:function(n){var t,e=p(this);e&&e.element&&(t=E(n,e),n!==L.READY&&t&&f(N.REMOVE_LISTENER,n,e.element))}},S(_.prototype,l(b)),S(_.prototype,l(P),!0)},function(n,t){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}},function(n,t){n.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}},function(n,t){n.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}]);
    window.onpopstate = function(event) { 
            refresh(location.pathname + location.search);
    }
   
    $(this).on('click', 'a, button',function (e) {
            // custom handling here
            e.preventDefault();
            var href = $(this).attr('href') || $(this).attr('href-hidden');

            if (href == '#')
            {
                return;
            }

            var def = document.location.href.match(/http[s]*:\/\/([a-zA-Z0-9\-\.]*)/)[1];
            try {
            if (href.match(/http[s]*:\/\/([a-zA-Z0-9\-\.]*)/)[1] != def) {
                window.open(href, "_blank");
            }
            } catch (e)
            {
                if ( history.pushState )  history.pushState("","", href);
                if (href)
                refresh(href);
            }
    });

});

function NowPlaying()
{
    this.list = [];
}

NowPlaying.prototype.pushToFloatBox = function(artist, album, title)
{
    $(".playlistbox .panel #list").append('<div class="panel-body"><a href="/song/'+artist+'">'+artist+'</a> - <a href="/song/'+artist+'/'+album+'/'+title+'">'+title+'</a></br></div>')
}

NowPlaying.prototype.getList = function ()
{
    return this.list;
}

NowPlaying.prototype.addList = function (artist, album, title, source)
{
    
    if (source)
    {
        var fn = {
            "artist" : artist,
            "album" : album,
            "title" : title,
            "source": source.source,
            "code": source.code
        }
        this.list.push(fn);
        this.pushToFloatBox(artist, album, title);
    }
    else
    {
        getPlaysource(artist, album, title, function (result) {
            if (!result.result)
            {
                    var fn = {
                    "artist" : artist,
                    "album" : album,
                    "title" : title,
                    "source": result.source,
                    "code": result.code
                }
                this.list.push(fn);
                this.pushToFloatBox(artist, album, title);
                console.log(fn);
        
            }
            else 
            {
                alert('추가 실패');
            }

        });
    }

    console.log(this.list);

}
function addToNowPlaylist(artist, album, title, source)
{
    nowplaying.addList(artist, album, title, source);
}

function getPlaysource(artist, album, title, callback)
{
    $.ajax({
        url: "/api/song/playsource/"+artist+"/"+album+"/"+title,
        type: 'GET',
        dataType: 'json',
        success: function(result)
        {
            callback(result);
        }
    })
}

function addhistory(artist, album, title, func) 
{
    if (!$.cookie("frv"))
    {
        return ;
    }
    
    $.ajax({
        url: "/api/history/add",
        type: 'POST',
        dataType: 'json',
        data: {
          "auth": $.cookie("frv"), 
          "artist": artist, 
          "album": album, 
          "title": title
        },
        success: function(result) {
            func();
        },
      
   });
}

function refresh_important(url)
{
    console.log("refresh_important at custom.js");
    window.location.href = url;
}

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
    $( "div.floatplayerbox" ).html('<div class="floatplayer" id="floatplayer"></div>');
    $( "div.floatplayerbox" ).removeClass("hidden");

    player = new YT.Player('floatplayer', {
        height: '360',
        width: '640',
        videoId: code,
        events: {
            'onReady' : onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // 終わりを表す。
    if (event.data == 0)
    {
        var obj = nowplaying.list[0];
        event.target.loadVideoById(nowplaying.list[0].code);
        addhistory(obj.artist, obj.album, obj.title, function() {
            console.log("added - " + obj.artist + " - " + obj.album + " - " +  obj.title );
        });

        if (nowplaying.list[0].source == "youtube")
        {
            event.target.playVideo();
        }
        else
        {
            soundcloud_setContentPlayer_autoplay(nowplaying.list[0].code);
        }
        nowplaying.list.shift();
    }
}

function soundcloud_setContentPlayer_autoplay(code)
{
    $( "div.floatplayerbox" ).html('<div class="youtube"><iframe id="widget" width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https://soundcloud.com/'+code+'&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe></div>');
    $( "div.floatplayerbox" ).removeClass("hidden");
    
    var iframe = document.getElementById('widget');
    var sc = SC.Widget(iframe);
    sc.bind(SC.Widget.Events.READY, function () {
        console.log('Ready');
        sc.bind(SC.Widget.Events.PLAY, function () {
            sc.getCurrentSound(function (sound) {
                console.log(sound.title);
            });
        });
           sc.bind(SC.Widget.Events.FINISH, function () {
               console.log('Finished');
        });
    });
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

function fetch_word_break(str)
{
    return str.replace("\n", "\\r\\n");
}

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

function unfetch(str)
{
    return str.replaceAll('+', ' ');
}
function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (var i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}

function getAlbumImage(artist, album, callback)
{
    $.ajax({
        url: "/api/song/image/"+artist+"/"+album,
        type: 'GET',
        dataType: 'html',
        timeout: 5000,
        success: function(result)
        {
            callback(result);
        }
    })
}

function hideNowPlayingList()
{
    $('.playlistbox').animate({
        left:-220
    });

}

function showNowPlayingList()
{
    $('.playlistbox').animate({
        left:10
    });
}