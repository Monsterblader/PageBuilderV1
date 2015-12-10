$(document).ready(function(){
    
    // load template content
    var loadTemplate = function () {
        console.log("loadTemplate");
        $.get("sections/layout/template-" + storedSettings.viewOptions.viewport + ".html", function(data){
            $("#content").append(data);
        }); 
    };
    
    // load top and sidebar controls
    var loadControls = function() {
        console.log("loadControls");
        $.get("sections/controls/top-controls.html", function(data){
            $("#top-controls").html(data);
        });
        $.get("sections/controls/side-controls.html", function(data){
            $("#side-controls").html(data);
            if ( storedSettings.contentOptions.pageLayout !== "layout1" ) {
                $(".optional-options").hide();
                $("#layout-dropdown").removeClass("bottom-divider");
            } else {
            }
        });
    };
    
    // Load content for template
    var loadContent = function () {
        console.log("loadContent");
        // Load panels content
        $.get("sections/layout/panel-1.html", function (data) {
            $("#panel-1").append(data);
            renderDate();
        });
        $.get("sections/layout/panel-2.html", function (data) {
            $("#panel-2").append(data);
        });
        $.get("sections/layout/panel-3.html", function (data) {
            $("#panel-3").append(data);
        });
        $.get("sections/layout/shipping-activity.html", function (data) {
            $("#shipping-activity").append(data);
        });
        
        // Load marketing grid
        $.get("sections/layout/marketing-grid/marketing-grid-" + storedSettings.contentOptions.marketingGrid + ".html", function (data) {
            $("#marketing-grid").append(data);
            $("#marketing-grid-range").val(storedSettings.contentOptions.marketingGrid);
        });
        
    };
    
    // setup the controls
    var setupSettings = function () {
        console.log("setupSettings");
        // set stored status button
        $(".top-control-button[name=" + storedSettings.viewOptions.status + "]").addClass("selected-option");
        // set stored viewport button
        $(".top-control-button[name=" + storedSettings.viewOptions.viewport + "]").addClass("selected-option");
        // set layout
        $("#dropdown-layout").find("li:first").text( storedSettings.contentOptions.pageLayout );
        // set default layout
        $("#dropdown-left-panel-shipping").find("li:first").text( storedSettings.contentOptions.leftPanel.shipping );
        $("#dropdown-left-panel-delivered").find("li:first").text( storedSettings.contentOptions.leftPanel.delivered );
        $("#dropdown-right-panel-shipping").find("li:first").text( storedSettings.contentOptions.rightPanel.shipping );
        $("#dropdown-right-panel-delivered").find("li:first").text( storedSettings.contentOptions.rightPanel.delivered );
        $("#dropdown-skinny-bar-shipping").find("li:first").text( storedSettings.contentOptions.skinnyBar.shipping );
        $("#dropdown-skinny-bar-delivered").find("li:first").text( storedSettings.contentOptions.skinnyBar.delivered );
    };
    
    
    
    var loadPanel1 = function() {
        console.log("loadPanel1");
        // Change position 1 content based on status
        if ( storedSettings.viewOptions.status !== "delivered" ) {
            $("#position-1").show();
            switch( storedSettings.contentOptions.leftPanel.shipping ) {
                case "marketing":
                    $.get("sections/layout/position-1/marketing.html", function (data) {
                        $("#position-1").html(data);
                    });
                    break;
                case "calendar":
                     $.get("sections/layout/position-1/calendar.html", function (data) {
                        $("#position-1").html(data);
                    });
                    console.log("display calendar");
                    styleCalendar();
                    break;
                case "sms":
                    $.get("sections/layout/position-1/sms.html", function (data) {
                        $("#position-1").html(data);
                    });
                    break;
                case "survey":
                     $.get("sections/layout/position-1/survey.html", function (data) {
                        $("#position-1").html(data);
                    });
                    break;
                case "none":
                    $("#position-1").hide();
                    break;
            }
        } else {
            switch( storedSettings.contentOptions.leftPanel.delivered ) {
                case "marketing":
                    $.get("sections/layout/position-1/marketing.html", function (data) {
                        $("#position-1").html(data);
                    });
                    break;
                case "faq":
                     $.get("sections/layout/position-1/faq.html", function (data) {
                        $("#position-1").html(data);
                    });
                    break;
                case "survey":
                     $.get("sections/layout/position-1/survey.html", function (data) {
                        $("#position-1").html(data);
                    });
                    break;
            }
        }
    };
    
    var renderDate = function() {
        // Date Range - Single Date
        console.log("render edd (dr/js)");
        if ( storedSettings.viewOptions.status === "just-shipped" ) { 
            var edd1WeekDay = $("#edd-1 .edd-week-day").text().substr(0,3);// truncate week days
            $("#edd-1 .edd-week-day").text(edd1WeekDay);
            var edd2WeekDay = $("#edd-2 .edd-week-day").text().substr(0,3);// truncate week days
            $("#edd-2 .edd-week-day").text(edd2WeekDay);
            $("#edd-2 , #date-range-separator").show(); // show date range
        } else {
            $("#edd-1 .edd-week-day").text("monday");
            $("#edd-2 , #date-range-separator").hide(); // hide date range
        }
    };
    
    var styleCalendar = function() {
        console.log("style calendar");
        // Change panel 1 content based on status
        if ( storedSettings.viewOptions.status === "just-shipped" ) {
            $("#panel-1 h1").text("ESTIMATED DELIVERY"); // panel 1 title
            $("#calendar h2").text("7 days away").removeClass("white-text"); // calendar countdown
            // calendar markers
            $("#calendar").css("opacity", "1");
            $(".calendar-day").removeClass("empty-marker");
            for (i=15; i < 18; i++) {
                $(".calendar-day[value='" + i + "']").addClass("filled-marker");
            }
            for (i=9; i < 15; i++) {
                $(".calendar-day[value='" + i + "']").addClass("empty-marker");
            }
        } else if ( storedSettings.viewOptions.status === "in-transit" ) {
            $("#panel-1 h1").text("ESTIMATED DELIVERY"); // panel 1 title
            $("#edd-2 , #date-range-separator").hide(); // hide date range
            $("#calendar h2").text("5 days away").removeClass("white-text"); // calendar countdown
            // calendar markers
            $("#calendar").css("opacity", "1");
            $(".calendar-day").removeClass("empty-marker filled-marker");
            $(".calendar-day[value='15']").addClass("filled-marker");
            for (i=11; i < 15; i++) {
                $(".calendar-day[value='" + i + "']").addClass("empty-marker");
            }
        } else if ( storedSettings.viewOptions.status === "delivered") {
            $("#panel-1 h1").text("DELIVERED ON"); // panel 1 title
            $("#calendar h2").html("<span class='link'>Where is my package?</span>"); // calendar countdown
            $("#calendar").css("opacity", "1");
            $(".calendar-day").removeClass("empty-marker filled-marker"); // calendar markers
            $(".calendar-day[value='15']").addClass("filled-marker");
        } else {
            $("#panel-1 h1").text("ESTIMATED DELIVERY"); // panel 1 title
            $("#edd-2 , #date-range-separator").hide(); // hide date range
            // calendar
            $("#calendar h2").text("...").addClass("white-text"); // calendar countdown
            $(".calendar-day").removeClass("empty-marker filled-marker"); // calendar markers
            $("#calendar").css("opacity", ".6");
        }
    };
    
    var loadPanel2 = function() {
        console.log("loadPanel2");
        // Change panel 2 content based on status
        $("#shipping-activities ul li").hide(); // hide all scans
        if ( storedSettings.viewOptions.status === "just-shipped" ) { 
            // load status
            $.get("sections/layout/status/status-js.html", function (data) {
                $("#status").html(data);
            });
           // shipping activity
            $("#shipping-activities ul li:first").show().addClass("no-bottom-border");
            $("#shipping-activities ul li:nth-child(2)").removeClass("exception-scan");
        } else if ( storedSettings.viewOptions.status === "in-transit" ) {
            // load status
            $.get("sections/layout/status/status-it.html", function (data) {
                $("#status").html(data);
            });
            // shipping activity
            $("#shipping-activities ul li:lt(4)").show();
            $("#shipping-activities ul li:first").hide();
            $("#shipping-activities ul li:nth-child(2)").removeClass("exception-scan");
        } else if (storedSettings.viewOptions.status === "delivered") {
            // load status
            $.get("sections/layout/status/status-del.html", function (data) {
                $("#status").html(data);
            });
            // shipping activity
            $("#shipping-activities ul li:lt(6)").show();
            $("#shipping-activities ul li:first").hide();
            $("#shipping-activities ul li:nth-child(2)").removeClass("exception-scan");
        } else {
            // load status
            $.get("sections/layout/status/status-exc.html", function (data) {
                $("#status").html(data);
            }); 
            // shipping activity
            $("#shipping-activities ul li:lt(6)").show();
            $("#shipping-activities ul li:first").hide();
            $("#shipping-activities ul li:nth-child(2)").addClass("exception-scan");
        }
    };
    
    var loadPosition2 = function() {
            // Change position 2 content based on status
            if ( storedSettings.viewOptions.status !== "delivered" ) {
                switch( storedSettings.contentOptions.rightPanel.shipping ) {
                    case "marketing":
                        $.get("sections/layout/position-2/marketing.html", function (data) {
                            $("#panel-3-content").html(data);
                        });
                        break;
                    case "faq":
                         $.get("sections/layout/position-2/faq.html", function (data) {
                            $("#panel-3-content").html(data);
                        });
                        break;
                    case "sms":
                        $.get("sections/layout/position-2/sms.html", function (data) {
                            $("#panel-3-content").html(data);
                        });
                        break;
                    case "survey":
                         $.get("sections/layout/position-2/survey.html", function (data) {
                            $("#panel-3-content").html(data);
                        });
                        break;
                }
            } else {
                switch( storedSettings.contentOptions.rightPanel.delivered ) {
                    case "marketing":
                        $.get("sections/layout/position-2/marketing.html", function (data) {
                            $("#panel-3-content").html(data);
                        });
                        break;
                    case "faq":
                         $.get("sections/layout/position-2/faq.html", function (data) {
                            $("#panel-3-content").html(data);
                        });
                        break;
                    case "survey":
                         $.get("sections/layout/position-2/survey.html", function (data) {
                            $("#panel-3-content").html(data);
                        });
                        break;
                }
            }
            console.log("loadPosition2");
        };
    
    var loadPosition3 = function() {
        // Change skinny bar content based on status
        $("#skinny-bar").show(); // show skinny bar by default
        if ( storedSettings.viewOptions.status !== "delivered" ) {
            switch( storedSettings.contentOptions.skinnyBar.shipping ) {
                case "sms":
                    $.get("sections/layout/position-3/sms.html", function (data) {
                        $("#skinny-bar").html(data);
                    });
                    break;
                case "survey":
                     $.get("sections/layout/position-3/survey.html", function (data) {
                        $("#skinny-bar").html(data);
                    });
                    break;
                case "none":
                    $("#skinny-bar").hide();
                    break;
            }
        } else {
            switch( storedSettings.contentOptions.skinnyBar.delivered ) {
                case "survey":
                    $.get("sections/layout/position-3/survey.html", function (data) {
                        $("#skinny-bar").html(data);
                    });
                    break;
                case "none":
                    $("#skinny-bar").hide();
                    break;
            }
        }
    };
    

    
    // change viewport option
    $(document).on("click", "#viewport-controls .top-control-button", function(){
        $("#viewport-controls .top-control-button").removeClass("selected-option");
        $(this).addClass("selected-option");
        storedSettings.viewOptions.viewport = $(this).attr("name");
        $.get("sections/layout/template-" + storedSettings.viewOptions.viewport + ".html", function(data){
            $("#content").html(data);
        });
        loadContent(); // load the content on viewport switch
        setupSettings();
        console.log("viewport");
    });
    
    // change status option
    $(document).on("click", "#status-controls .top-control-button", function(){
        $("#status-controls .top-control-button").removeClass("selected-option");
        $(this).addClass("selected-option");
        storedSettings.viewOptions.status = $(this).attr("name");
        renderDate();
        loadPosition2();
        loadPanel1();
        loadPanel2();
        loadPosition3();
        setupSettings();
        console.log("status");
    });
    
    // change layout
    $(document).on("change", "#dropdown-layout", function(){
        storedSettings.contentOptions.pageLayout = $("#dropdown-layout option:selected").val();
        if ( storedSettings.contentOptions.pageLayout !== "layout1" ) {
            // custom layout
            $(".optional-options").hide();
            $("#layout-dropdown").removeClass("bottom-divider");
            storedSettings.contentOptions.leftPanel.shipping = "calendar";
            storedSettings.contentOptions.leftPanel.delivered = "marketing";
            storedSettings.contentOptions.rightPanel.shipping = "marketing";
            storedSettings.contentOptions.rightPanel.delivered = "faq";
            storedSettings.contentOptions.skinnyBar.shipping = "sms";
            storedSettings.contentOptions.skinnyBar.delivered = "survey";
            
            
            if ( storedSettings.contentOptions.pageLayout === "layout2" ) {
                // layout 2
                storedSettings.contentOptions.leftPanel.shipping = "calendar";
                storedSettings.contentOptions.leftPanel.delivered = "marketing";
                storedSettings.contentOptions.rightPanel.shipping = "marketing";
                storedSettings.contentOptions.rightPanel.delivered = "faq";
                storedSettings.contentOptions.skinnyBar.shipping = "sms";
                storedSettings.contentOptions.skinnyBar.delivered = "survey";
                console.log("2");
            } else {
                // layout 3
                storedSettings.contentOptions.leftPanel.shipping = "sms";
                storedSettings.contentOptions.leftPanel.delivered = "survey";
                storedSettings.contentOptions.rightPanel.shipping = "marketing";
                storedSettings.contentOptions.rightPanel.delivered = "faq";
                storedSettings.contentOptions.skinnyBar.shipping = "none";
                storedSettings.contentOptions.skinnyBar.delivered = "none";
            }
        } else {
            $(".optional-options").show();
            $("#layout-dropdown").addClass("bottom-divider");
        }
        loadPanel1();
    loadPosition2();
    loadPanel2();
    loadPosition3();
        
    });
    
    // change content in left panel
    $(document).on("change", "#left-panel-dropdowns", function(){
        storedSettings.contentOptions.leftPanel.shipping = $( "#dropdown-left-panel-shipping option:selected" ).val();
        storedSettings.contentOptions.leftPanel.delivered = $( "#dropdown-left-panel-delivered option:selected" ).val();
        loadPanel1();
        setupSettings();
        console.log("left");
    });
    
    // change content in right panel
    $(document).on("change", "#right-panel-dropdowns", function(){
        storedSettings.contentOptions.rightPanel.shipping = $( "#dropdown-right-panel-shipping option:selected" ).val();
        storedSettings.contentOptions.rightPanel.delivered = $( "#dropdown-right-panel-delivered option:selected" ).val();
        loadPosition2();
        setupSettings();
        console.log("right");
    });
    
    // change content in skinny bar
    $(document).on("change", "#skinny-bar-dropdowns", function(){
        storedSettings.contentOptions.skinnyBar.shipping = $( "#dropdown-skinny-bar-shipping option:selected" ).val();
        storedSettings.contentOptions.skinnyBar.delivered = $( "#dropdown-skinny-bar-delivered option:selected" ).val();
        loadPosition3();
        setupSettings();
        console.log("skinny");
    });
    
    // Change marketing grid option
    $(document).on('change', '#marketing-grid-range', function(){
        storedSettings.contentOptions.marketingGrid = $('#marketing-grid-range').val();
        if ( storedSettings.contentOptions.marketingGrid !== "0") {
             $.get("sections/layout/marketing-grid/marketing-grid-" + storedSettings.contentOptions.marketingGrid + ".html", function (data) {
                $("#marketing-grid").html(data);
            });
        } else {
            $("#marketing-grid").html('');
        }
       
    });
    
    loadTemplate();
    loadControls();
    setupColors();
    loadContent();
    loadPanel1();
    loadPosition2();
    loadPanel2();
    loadPosition3();
    setupSettings();
    styleCalendar();
    console.log("___");
});