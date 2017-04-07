$('a').click(function (e) {
    // custom handling here
    e.preventDefault();

    //alert($(this).attr('href') );

    var href = $(this).attr('href');
    history.pushState("", "", href);
});