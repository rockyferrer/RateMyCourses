$(document).ready(function() {
    //functionality for the edit button
    $('.save').hide();
    $('.userIDInput').hide();
    $('.pwdInput').hide();
    $('#savePwd').hide();

    $('.edit').click(function() {
        var inputSiblingEl = $(this).siblings("input.userIDInput");
        var spanSiblingEl = $(this).siblings("span");
        inputSiblingEl.val(spanSiblingEl.text());
        inputSiblingEl.show();
        spanSiblingEl.hide();
        $(this).hide();
        $(this).siblings("a.save").show();
    });

    //functionality for the save button
    $('.save').click(function() {
        var inputSiblingEl = $(this).siblings("input.userIDInput");
        var spanSiblingEl = $(this).siblings("span");
        spanSiblingEl.text(inputSiblingEl.val());
        inputSiblingEl.hide();
        spanSiblingEl.show();
        $(this).hide();
        $(this).siblings("a.edit").show();
    });

    //functionality for the change password button
    $('#changePwd').click(function() {
        $('#password').hide();
        $('.pwdInput').show();
        $(this).hide();
        $('#savePwd').show();
    });

    //functionality for the save password button
    $('#savePwd').click(function() {
        $('#password').show();
        $('.pwdInput').hide();
        $(this).hide();
        $('#changePwd').show();
    });

});
