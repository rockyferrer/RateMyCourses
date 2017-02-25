/** jQuery **/

$(document).ready(function() {

	//Toggles registration fields
	$('#register-btn').click(function(e) {
	    e.preventDefault();
	    $(".register-field").toggle();
	    $("#login-btn").toggle();
		$("#create-account").toggle();
		$("#forgot-btn").toggle();
		if($(".required-field").css("required")){
			$(".required-field").css("required", "false");
		}else{
			$(".required-field").css("required", "true");
		}
		
	});

	$('#nav-header').load('header.html');

});

/** Angular **/

var app = angular.module("login", []);

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
