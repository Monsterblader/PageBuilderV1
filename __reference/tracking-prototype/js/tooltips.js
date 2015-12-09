// loop through all tooltips content

$(document).hover(function(){
    $.each( tooltips_content, function( key, value ) {
        var id = "#tooltip-" + key;
        $(id).tooltipster({
            content: value,
            animation: 'fade',
            theme: 'tooltip-theme',
            touchDevices: false,
            trigger: 'hover'
        });
    });
});