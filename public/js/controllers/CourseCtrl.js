angular.module('CourseCtrl', []).controller('CourseController', function($scope, $http, $routeParams, Course) {

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

    $scope.tagsContainsNulls = function() {
        for (var i = 0; i < $scope.currentTags.length; i++) {
            if ($scope.currentTags[i] == null) {
                return true;
            }
        }
        return false;
    }

    //TODO: there is a bug when you select 3 tags, then deselect one and then
    // try to reselect it again. Otherwise, it works perfectly if you stick with
    // the first 3 tags u choose
    $scope.chooseTag = function($event, $index) {
        var chosenEl = angular.element($event.target);
        var chosenTag = $scope.tags[$index];
        console.log($scope.currentTags.indexOf(chosenTag));
        //if the tag has not been chosen and less than three overall have been chosen
        if ($scope.currentTags.indexOf(chosenTag) == -1 && $scope.currentTags.length < 3) {
            console.log('chose: ' + chosenTag);
            if ($scope.tagsContainsNulls()) {
                for (var i = 0; i < $scope.currentTags.length; i++) {
                    if ($scope.currentTags[i] == null) {
                        $scope.currentTags[i] = chosenTag;
                        break;
                    }
                }
            } else {
                $scope.currentTags.push(chosenTag);
            }
            chosenEl.css('background-color', '#337ab7');
            console.log('stored: ' + chosenTag);
        } else if ($scope.currentTags.indexOf(chosenTag) != -1) {
            console.log("deselecting");
            $scope.currentTags[$scope.currentTags.indexOf(chosenTag)] = null;
            chosenEl.css('background-color', 'rgba(55, 64, 70, 0.4)');

        }
    };

    $scope.postRating = function() {
        //debugging
        if ($scope.currentTags.length > 0) {
            for (var i = 0; i < $scope.currentTags.length; i++) {
                console.log('the ' + i + 'th element is ' + $scope.currentTags[i]);
            }
        } else {
            console.log('no tags chosen');
        }

        // return $scope.currentTags;
    };

});
