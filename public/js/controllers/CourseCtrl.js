angular.module('CourseCtrl', []).controller('CourseController', function($scope, $http, $routeParams, $rootScope, Course) {

    $http.get('/api/courses/' + $routeParams.courseCode).then(function(data) {
        $scope.course = data.data;
    });

    $http.get('/api/courses/' + $routeParams.courseCode + '/getRatings').then(function(data) {
        $scope.ratings = data.data;
        console.log(data.data[0].tags[0]);
    });

    $scope.options = ['1', '2', '3', '4', '5'];

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
    ];

    $scope.currentTags = [];

    $scope.ratingForm = {
        "difficulty": 0,
        "workload": 0,
        "learningExp": 0,
        "overall": 0,
        "tags": $scope.currentTags,
        "comment": "",
        "user": $rootScope.user
    };

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
        if ($scope.currentTags.indexOf(chosenTag) == -1 && ($scope.currentTags.length < 3 || $scope.tagsContainsNulls())) {
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
    $scope.submitRating = function() {
        /*console.log("difficulty rating is " + $scope.difficulty);
        console.log("workload is " + $scope.workload);
        console.log("learning experience is " + $scope.learningExp);
        console.log("overall is " + $scope.overall);
        console.log("comment is " + $scope.comment);*/

        $http.post('/api/courses/' + $routeParams.courseCode + '/addRating', $scope.ratingForm).then(
            function(data) {
                if (data.status == 200) {
                    $http.get('/api/courses/' + $routeParams.courseCode + '/getRatings')
                        .then(function(data) {
                            $scope.ratings = data.data;
                            console.log("updated ratings");
                        });
                } else {
                    console.log('failure');
                }
            }
        );

        console.log('done submitting rating');
        // return $scope.currentTags;
    };

});