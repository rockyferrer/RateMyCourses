/** jQuery **/

$(document).ready(function() {

    //Toggles registration fields
    $('#add-rating-btn').click(function(e) {
        e.preventDefault();
        $(".add-field").slideToggle(400, "linear");
    });

    $('#nav-header').load('header.html');

});