// site.js

(function() {

    //var ele = document.getElementById("username");
    //ele.innerHTML = "Dale Thompson";

    //var ele = $("#username");
    //ele.text("Dale Thompson");

    //var main = $("#main");
    //main.on("mouseenter", function() {
    //    main.css("background-color", "#888");
    //});
    //main.on("mouseleave", function() {
    //    main.css("background-color", "");
    //});

    //var menuItems = $("ul.menu li a");
    //menuItems.on("click",
    //    function () {
    //        var me = $(this);
    //        alert(me.text());
    //    });

    // beginning dollar on variable just a reminder that it is a jQuery object
    var $sidebarAndWrapper = $("#sidebar, #wrapper");
    var $icon = $("#sidebarToggle i.fa");

    $("#sidebarToggle").on("click",
        function() {
            $sidebarAndWrapper.toggleClass("hide-sidebar");
            if ($sidebarAndWrapper.hasClass("hide-sidebar")) {
                $icon.removeClass("fa-angle-left");
                $icon.addClass("fa-angle-right");
            } else {
                $icon.removeClass("fa-angle-right");
                $icon.addClass("fa-angle-left");
            }
        });
})();
