angular.module('controllers.approvePhoto', ['services.dialogs'])
    .controller('approvePhotoController', [
        '$scope', '$rootScope', 'httpRequest', '$localStorage',
        function ($scope, $rootScope, httpRequest, $localStorage) {
            'use strict';

            $scope.gridOptions = {};

            function getUnapprovedPhotos() {
                httpRequest.getUnapprovedPhotos({}).then(function (response) {
                    $scope.gridOptions.photos = response;
                    for (var i = 0; i < $scope.gridOptions.photos.length; i++) {
                        $scope.gridOptions.photos[i].src = "data:image/png;base64," + $scope.gridOptions.photos[i].src;
                    }
                });
            }

            $scope.approve = function (photo) {
                httpRequest.approvePhoto(photo).then(function (response) {
                    getUnapprovedPhotos();
                });
            }

            $scope.delete = function (photo) {
                httpRequest.deletePhoto(photo).then(function (response) {
                    getUnapprovedPhotos();
                });
            }

            getUnapprovedPhotos();
        }]);
