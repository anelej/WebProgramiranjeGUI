angular.module('controllers.photoSearch', ['services.dialogs'])
    .controller('photoSearchController', [
        '$scope', '$rootScope', 'httpRequest', 'buyPhotoDialog', '$localStorage', '$location',
        function ($scope, $rootScope, httpRequest, buyPhotoDialog, $localStorage, $location) {
            'use strict';

            $scope.searchPhoto = {
                page: 1,
                pageSize: 10,
                kupljeneFotografije: false
            };
            $scope.gridOptions = {
                sellers: [],
                categories: [],
                photos: []
            }

            $scope.gridOptions.sortOrder = [
                { name: "Nazivu", value: "f.Naziv" },
                { name: "Datumu", value: "f.DatumPostavljanja" },
            ];

            $scope.gridOptions.sortDirection = [
                { name: "Rastuce", value: "asc" },
                { name: "Opadajuce", value: "desc" },
            ];

            $scope.selectedSortOrder = {};
            $scope.selectedSortDirection = {};

            $scope.clear = function () {
                $scope.searchPhoto = {
                    page: 1,
                    pageSize: 10,
                    kupljeneFotografije: false
                };
                $scope.selectedCategory = {};
                $scope.selectedSeller = {};
            }

            function getParameterFromUrl() {
                var sellerId = $location.search().sellerId;
                $scope.searchPhoto = {
                    page: 1,
                    pageSize: 10
                };
                if (sellerId) {
                    for (var i = 0; i < $scope.gridOptions.sellers.length; i++) {
                        if ($scope.gridOptions.sellers[i].id == sellerId) {
                            $scope.selectedSeller = $scope.gridOptions.sellers[i];
                            $scope.searchPhoto.prodavacId = sellerId;
                        }
                    }
                    $scope.searchClick();
                }
            }
            $scope.searchClick = function () {
                if($scope.searchPhoto.kupljeneFotografije) {
                    $scope.searchPhoto.kupacId = $localStorage.userId;
                }
                httpRequest.searchPhoto($scope.searchPhoto).then(function (response) {
                    $scope.gridOptions.photos = response;
                    for (var i = 0; i < $scope.gridOptions.photos.length; i++) {
                        $scope.gridOptions.photos[i].src = "data:image/png;base64," + $scope.gridOptions.photos[i].src;

                        for (var j = 0; j < $scope.gridOptions.categories.length; j++) {
                            if ($scope.gridOptions.photos[i].fotografijaKategorijaId == $scope.gridOptions.categories[j].id) {
                                $scope.gridOptions.photos[i].kategorija = $scope.gridOptions.categories[j].naziv;
                            }
                        }
                    }
                });
            }

            $scope.onCategoryChange = function () {
                $scope.searchPhoto.fotografijaKategorijaId = $scope.selectedCategory.id;
            }

            $scope.onSellerChange = function () {
                $scope.searchPhoto.prodavacId = $scope.selectedSeller.id;
            }

            function getCategories() {
                httpRequest.getCategories().then(function (response) {
                    $scope.gridOptions.categories = response;
                });
            }

            function getSellers() {
                httpRequest.getSellers().then(function (response) {
                    $scope.gridOptions.sellers = response;
                });
            }

            $scope.openPhoto = function (id) {
                httpRequest.getPhotoById(id, $localStorage.userId).then(function (response) {
                    buyPhotoDialog.open(response);
                });
            }

            $scope.nextPage = function () {
                $scope.searchPhoto.page = $scope.searchPhoto.page + 1;
                $scope.searchClick();
            }

            $scope.previousPage = function () {
                $scope.searchPhoto.page = $scope.searchPhoto.page - 1;
                $scope.searchClick();
            }

            $scope.onSortOrderChange = function () {
                $scope.searchPhoto.sortOrder = $scope.selectedSortOrder.value;
            }

            $scope.onSortDirectionChange = function () {
                $scope.searchPhoto.sortDirection = $scope.selectedSortDirection.value;
            }

            getSellers();
            getCategories();
            $scope.searchClick();
            getParameterFromUrl();
        }]);