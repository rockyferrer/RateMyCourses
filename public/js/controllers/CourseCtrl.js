var app = angular.module('CourseCtrl', []);

// Star rating code taken from http://www.angulartutorial.net/2014/03/rating-stars-in-angular-js-using.html
var ratingCtrl = app.controller('RatingCtrl', function($scope, $http) {
    $scope.rating = 5;
    $scope.changeRating = function(rating) {
        $window.alert('Rating selected - ' + rating);
        var data = {
            rating: rating
        };
        console.log('data');

        $http.post('/api/courses/courseCode', angular.toJson(data), {
                cache: false
            })
            .success(function(data) {
                success(data);
            })
            .error(function(data) {
                error(data);
            });

    };
});

ratingCtrl.directive('starRating',
    function() {
        return {
            restrict: 'A',
            template: '<ul class="rating">' +
                '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                '\u2605' +
                '</li>' +
                '</ul>',
            scope: {
                ratingValue: '=', //value set in html attr
                max: '=', //value set in html attr
                onRatingSelected: '&' //expects a function
            },
            link: function(scope, elem, attrs) {
                var updateStars = function() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function(index) {
                    // var ratedEl = angular.element(event.target);
                    // console.log(ratedEl.parent().parent().className);
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function(oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            }
        };
    }
);

app.controller('CourseController', function($scope, $http, $routeParams, Course) {

    $scope.cssFilename = "course";
    $http.get('/api/courses/' + $routeParams.courseCode).then(function(data) {
        $scope.course = data.data;
    });

    $scope.tags = [
        'Cool',
        'Fun',
        'Great TAs',
        'Exclusive Tag For Best Course Ever',
        'Fair',
        'Great Professor',
        'Lots of Smiles',
        'Spicy',
        'Please Give Me a Good Mark',
        'Would Take Again'
    ]

    $scope.currentTags = [];

    /**
     * Checks if the currentTags array contains any nulls, used in processTag
     */
    $scope.tagsContainsNulls = function() {
        for (var i = 0; i < $scope.currentTags.length; i++) {
            if ($scope.currentTags[i] == null) {
                return true;
            }
        }
        return false;
    }

    /**
     * function for when a tag is selected or deselected
     */
    $scope.processTag = function($event, $index) {
        var chosenEl = angular.element($event.target);
        var chosenTag = $scope.tags[$index];
        console.log($scope.currentTags.indexOf(chosenTag));
        //if the tag has not been chosen and
        //less than three overall have been chosen or there are nulls in currentTags
        if ($scope.currentTags.indexOf(chosenTag) == -1 && ($scope.currentTags.length < 3 || $scope.tagsContainsNulls)) {
            console.log('chose: ' + chosenTag);
            //if there is a null in the array, replace it with the selected tag
            if ($scope.tagsContainsNulls()) {
                for (var i = 0; i < $scope.currentTags.length; i++) {
                    if ($scope.currentTags[i] == null) {
                        $scope.currentTags[i] = chosenTag;
                        break;
                    }
                }
            } else { //no nulls, so just add it to the array
                $scope.currentTags.push(chosenTag);
            }
            //change css styles accordingly
            chosenEl.css('background-color', '#337ab7');
            console.log('stored: ' + chosenTag);
        } else if ($scope.currentTags.indexOf(chosenTag) != -1) {
            console.log("deselecting");
            //replace deselected tags in currentTags array with null
            $scope.currentTags[$scope.currentTags.indexOf(chosenTag)] = null;
            //change css styles accordingly
            chosenEl.css('background-color', 'rgba(55, 64, 70, 0.4)');

        }
    };

    /**
     * function for when a user wants to post their Rating
     * ie. when the done button is clicked.
     */
    $scope.postRating = function() {
        //debugging
        if ($scope.currentTags.length > 0) {
            for (var i = 0; i < $scope.currentTags.length; i++) {
                console.log('Element ' + i + ' is ' + $scope.currentTags[i]);
            }
        } else {
            console.log('no tags chosen');
        }

        // return $scope.currentTags;
    };

});
