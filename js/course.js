/** jQuery **/

$(document).ready(function() {

    //Toggles registration fields
    $('#add-rating-btn').click(function(e) {
        e.preventDefault();
        $(".add-field").slideToggle(400, "linear");
    });

    $('#nav-header').load('header.html');

});

/** Angular **/

var app = angular.module("course", []);

app.controller("ratings", function($scope) {
    $scope.rating = [{
        "difficulty": 2,
        "workload": 3,
        "experience:": 5,
        "average": 5,
        "comment": "Great course!"
    }, {
        "difficulty": 2,
        "workload": 5,
        "experience:": 5,
        "average": 4,
        "comment": "Very interesting course"
    }, {
        "difficulty": 2.5,
        "workload": 3,
        "experience:": 5,
        "average": 4.5,
        "comment": "Learned alot from this class."
    }]
});
