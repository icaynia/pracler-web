//화면에 처음 들어온 경우




// a 태그를 클릭할 경우
$('a').click(function (e) {
    // custom handling here
    e.preventDefault();

    //alert($(this).attr('href') );

    var href = $(this).attr('href');
    history.pushState("", "", href);

    refresh(href);
});


// 자체 새로고침 
function refresh(url)
{
    var tn = url;
    if (url.indexOf('#') == -1)
    {
        $('#main_content').load("/view"+url);
    }
}