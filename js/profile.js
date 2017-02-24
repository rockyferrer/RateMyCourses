$(document).ready(function() {
    $('.edit').click(function() {
        var inputSiblingEl = $(this).siblings("input.input");
        var spanSiblingEl = $(this).siblings("span");
        inputSiblingEl.val(spanSiblingEl.text());
        inputSiblingEl.show();
        spanSiblingEl.hide();
        $(this).hide();
        $(this).siblings("a.save").show();
    });

    $('.save').click(function() {
        var inputSiblingEl = $(this).siblings("input.input");
        var spanSiblingEl = $(this).siblings("span");
        spanSiblingEl.text(inputSiblingEl.val());
        inputSiblingEl.hide();
        spanSiblingEl.show();
        $(this).hide();
        $(this).siblings("a.edit").show();
    });

    $('#changePwd').click(function() {
        $('#password').hide();
        $('.pwdInput').show();
        $(this).hide();
        $('#savePwd').show();
    });

    $('#savePwd').click(function() {
        $('#password').show();
        $('.pwdInput').hide();
        $(this).hide();
        $('#changePwd').show();
    });

});

var app = angular.module("profile", []);

app.controller("departments", function($scope) {
	$scope.department_list = [
		"Computer Science",
		"Mathematics",
		"Business",
		"Statistics",
		"Life Sciences"
	]
});

app.controller("faculties", function($scope) {
	$scope.faculty_list = [
		"Arts and Sciences",
		"Applied Sciences and Engineering",
		"Education",
		"Law",
		"Dentistry"
	]
});
