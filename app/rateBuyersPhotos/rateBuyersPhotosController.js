angular.module('controllers.rateBuyersPhotos', ['services.dialogs'])
    .controller('rateBuyersPhotosController', [
        '$scope', '$rootScope', 'httpRequest', '$localStorage',
        function ($scope, $rootScope, httpRequest, $localStorage) {
            'use strict';

            $scope.selectedUser = {}
            $scope.average = 0;
            $scope.userPass = false;
            $scope.gridOptions = {
                users: [],
                photos: []
            };

            function getUsers() {
                httpRequest.getUsersForTest().then(function (response) {
                    $scope.gridOptions.users = response;
                    for (var i = 0; i < $scope.gridOptions.photos; i++) {
                        $scope.gridOptions.photos[i].ocena = 0;
                    }
                });
            }

            $scope.openUserPhotos = function (user) {
                $scope.selectedUser = user;
                $scope.calculateAverage();
                httpRequest.getPhotosFromBuyer(user.id).then(function (response) {
                    $scope.gridOptions.photos = response;
                    for (var i = 0; i < $scope.gridOptions.photos.length; i++) {
                        $scope.gridOptions.photos[i].src = "data:image/png;base64," + $scope.gridOptions.photos[i].src;
                    }
                });
            }

            $scope.passExam = function (user) {
                httpRequest.userBecomeSeller(user).then(function (response) {
                    $scope.gridOptions.photos = [];
                    $scope.selectedUser = {}
                    getUsers();
                });
            }

            $scope.failExam = function (user) {
                httpRequest.userFailTest(user).then(function (response) {
                    $scope.gridOptions.photos = [];
                    $scope.selectedUser = {}
                    getUsers();
                });
            }

            $scope.calculateAverage = function () {
                $scope.average = 0;
                for (var i = 0; i < $scope.gridOptions.photos.length; i++) {
                    $scope.average = +$scope.average + +$scope.gridOptions.photos[i].ocena;
                }
                $scope.average = $scope.average / $scope.gridOptions.photos.length;

                if ($scope.average > 4) {
                    $scope.userPass = true;
                } else {
                    $scope.userPass = false;
                }
            }

            getUsers();
        }]);