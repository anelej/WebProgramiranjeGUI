angular.module('services.dialogs')
    .factory('buyPhotoDialog', ['$rootScope', '$q', '$modal', '$localStorage', 'httpRequest', 'validation', 'msgDialog',
        function ($rootScope, $q, $modal, $localStorage, httpRequest, validation, msgDialog) {
            'use strict';

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'components/services/dialogs/buyPhotoDialog/template.html'
            };

            var buyPhotoService = {};
            buyPhotoService.open = function (photo) {

                //Create temp objects to work with since we're in a singleton service
                var tempModalDefaults = {};
                var tempModalOptions = {};
                photo = photo;

                //Map angular-ui modal custom defaults to modal defaults defined in service
                angular.extend(tempModalDefaults, modalDefaults);

                if (!tempModalDefaults.controller) {
                    tempModalDefaults.controller = function ($scope, $modalInstance) {
                        $scope.photo = photo;
                        // $scope.photo.srcForDownload = photo.src
                        $scope.photo.src = "data:image/png;base64," + photo.src;

                        $scope.userId = $localStorage.userId;
                        $scope.selectedCard = {};
                        $scope.selectedResolution = {};
                        $scope.gridOptions = {};
                        $scope.buyPhotoModel = {
                            photo: $scope.photo
                        };

                        $scope.userBoughtPhoto = false;
                        $scope.ratedPhoto = {
                            fotografijaId: $scope.photo.id,
                            korisnikId: $localStorage.userId
                        }

                        function onInit() {
                            for (var i = 0; i < $rootScope.photosPurchased.length; i++) {
                                if ($rootScope.photosPurchased[i] == $scope.photo.id) {
                                    $scope.userBoughtPhoto = true;
                                    break;
                                }
                            }
                        }

                        $scope.useExistingCard = false;

                        $scope.onCardChange = function () {
                            $scope.buyPhotoModel.card = $scope.selectedCard.brojKartice;
                        }

                        $scope.onResolutionChange = function () {
                            $scope.buyPhotoModel.resolution = $scope.selectedResolution;
                        }

                        function getCards() {
                            httpRequest.getCards($localStorage.userId).then(function (response) {
                                $scope.gridOptions.cards = response.result;
                            });
                        }
                        $scope.modalOptions = tempModalOptions;

                        $scope.modalOptions.ok = function () {
                            $modalInstance.close();
                        };

                        $scope.modalOptions.useExistingCard = function (useExistingCard) {
                            $scope.buyPhotoModel.card = "";
                            $scope.useExistingCard = useExistingCard;
                        };

                        $scope.modalOptions.buy = function () {
                            var errorList = [];
                            canBuy(errorList);
                            if (errorList.length == 0) {
                                $rootScope.cart.push($scope.buyPhotoModel);
                                $modalInstance.close();
                            } else {
                                validation.showErrors(errorList);
                            }

                        };

                        $scope.modalOptions.close = function () {
                            $modalInstance.close();
                        };

                        function canBuy(errorList) {
                            if (!$rootScope.cart) {
                                $rootScope.cart = [];
                            }
                            for (var i = 0; i < $rootScope.cart.length; i++) {
                                if ($rootScope.cart[i].photo.id == $scope.photo.id) {
                                    errorList.push("Fotografija je vec u korpi");
                                }
                            }

                            if(!$scope.buyPhotoModel.resolution){
                                errorList.push("Morate uneti rezoluciju");
                            }

                            if (!$scope.buyPhotoModel.card) {
                                errorList.push("Morate da odaberete karticu");
                            }
                            return errorList;
                        }

                        $scope.modalOptions.rate = function () {
                            $scope.ratedPhoto.ocena = $scope.photo.korisnikOcena;
                            httpRequest.ratePhoto($scope.ratedPhoto).then(function (response) {
                                $modalInstance.close();
                            });
                        }

                        $scope.modalOptions.sendPhotoOnMail = function () {
                            httpRequest.sendPhotoOnMail($scope.ratedPhoto).then(function (response) {
                                $modalInstance.close();
                            });
                        }

                        $scope.modalOptions.deletePhoto = function () {
                            httpRequest.deletePhoto($scope.photo.id).then(function (response) {
                                msgDialog.open("Uspesno ste obrisali fotografiju.");
                                $modalInstance.close();
                            });
                        }

                        onInit();
                        getCards();
                    };
                }

                return $modal.open(tempModalDefaults).result;
            };

            return buyPhotoService;
        }]);
