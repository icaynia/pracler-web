//화면에 처음 들어온 경우




// a 태그를 클릭할 경우
$('a, button').click(function (e) {
    // custom handling here
    e.preventDefault();

    //alert($(this).attr('href') );

    var href = $(this).attr('href');
    history.pushState("", "", href);

    refresh(href);
});

window.onpopstate = function(event) { 
        //alert("event" + location.pathname );
        refresh(location.pathname);
}

// 자체 새로고침 
function refresh(url)
{
    if (url != null)
    if (url.indexOf('#') == -1)
    {
        //alert(url);
        $('#main_content').load("/view"+url);
    }
}