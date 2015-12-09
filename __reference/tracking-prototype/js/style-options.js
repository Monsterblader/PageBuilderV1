// Set up default colors
var setupColors = function() {
    $("#main-color").attr("value", storedSettings.styleOptions.colors.main );
    $("#accent-color").val( storedSettings.styleOptions.colors.accent );
    $("#header-color").val( storedSettings.styleOptions.colors.header );
    $("#link-color").val( storedSettings.styleOptions.colors.link );
};



// Change main color
$(document).on("change", "#main-color", function() {
    var mainColor = $(this).val();
    $(".panel-header").css("background-color", "#" + mainColor);
    $(".panel-header").css("outlineColor", "#" + mainColor);
});

// Change accent color
$(document).on("keypress", "#accent-color", function() {
    var accentColor = $(this).val();
    $(".edd-week-day").css("color", "#" + accentColor);
    $(".edd-month").css("color", "#" + accentColor);
    $(".edd-day").css("color", "#" + accentColor);
    $("#date-range-separator").css("border-color", "#" + accentColor);
    $("#status-text").css("color", "#" + accentColor);
    console.log(accentColor);
});

// Change header color
$(document).on("change", "#header-color", function() {
    var headerColor = $(this).val();
    $("header").css("background-color", "#" + headerColor);
    $("header").css("border-color", "none");
});

// Change link color
$(document).on("change", "#link-color", function() {
    var linkColor = $(this).val();
    $(".panel-header").css("background-color", "#" + linkColor);
});