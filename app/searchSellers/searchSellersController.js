angular.module('controllers.searchSellers', ['services.dialogs'])
    .controller('searchSellersController', [
        '$scope', '$rootScope', 'httpRequest', '$localStorage', 'DEFAULT_ROUTE', '$location',
        function ($scope, $rootScope, httpRequest, $localStorage, DEFAULT_ROUTE, $location) {
            'use strict';

            $scope.gridOptions = {
                sellers: [],
                comments: []
            };
            $scope.selectedSeller = {};
            $scope.userBoughtFromThereSellers = [];
            $scope.newComment = {
                kupacId: $localStorage.userId
            }
            $scope.userCanComment = false;

            function getSellersOfBougthPhotos() {
                httpRequest.getSellersOfBougthPhotos($localStorage.userId).then(function (response) {
                    $scope.userBoughtFromThereSellers = response;
                });
            }

            function getSellers() {
                httpRequest.getSellers().then(function (response) {
                    $scope.gridOptions.sellers = response;
                });
            }

            $scope.getSellerDetails = function (seller) {
                $scope.selectedSeller = seller;
                httpRequest.getCommentsForSeller($scope.selectedSeller.id).then(function (response) {
                    $scope.gridOptions.comments = response;
                });
                for(var i = 0; i < $scope.userBoughtFromThereSellers.length; i++) {
                    if ($scope.userBoughtFromThereSellers[i] == $scope.selectedSeller.id) {
                        $scope.userCanComment = true;
                    }
                }
                $scope.newComment.prodavacId = $scope.selectedSeller.id
            }

            $scope.sendComment = function () {
                httpRequest.sendComment($scope.newComment).then(function (response) {
                    httpRequest.getCommentsForSeller($scope.selectedSeller.id).then(function (response) {
                        $scope.gridOptions.comments = response;
                    });
                });
            }

            $scope.searchSellersPhotos = function() {
                $location.path(DEFAULT_ROUTE.photoSearchRoute).search({sellerId: $scope.selectedSeller.id});
            }

            getSellersOfBougthPhotos();
            getSellers();
        }]);