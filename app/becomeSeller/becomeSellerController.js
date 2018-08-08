angular.module('controllers.becomeSeller', ['services.dialogs'])
    .controller('becomeSellerController', [
        '$scope', '$rootScope', 'httpRequest', '$localStorage', 'msgDialog',
        function ($scope, $rootScope, httpRequest, $localStorage, msgDialog) {
            'use strict';

            $scope.gridOptions = {
                companies: []
            }
            $scope.selectedCompany = {};

            $scope.gridOptions = {
                photos: []
            };

            $scope.alreadySent = false;

            function getCompanies() {
                httpRequest.getCompanies().then(function (response) {
                    $scope.gridOptions.companies = response;
                });

            }

            function getPhotosForUser() {
                httpRequest.getPhotosFromBuyer($localStorage.userId).then(function (response) {
                    $scope.gridOptions.photos = response;
                    for (var i = 0; i < $scope.gridOptions.photos.length; i++) {
                        $scope.gridOptions.photos[i].src = "data:image/png;base64," + $scope.gridOptions.photos[i].src;
                        $scope.gridOptions.photos[i].canDelete = false;
                    }
                });
            }

            $scope.imageUpload = function (event) {
                for (var i = 0; i < event.target.files.length; i++) {
                    if ($scope.gridOptions.photos.length > 10) {
                        break;
                    }
                    if (event.target.files[i].type.split("image")[0] == "") {
                        var file = event.target.files[i];
                        var reader = new FileReader();
                        reader.onload = $scope.imageIsLoaded;
                        reader.readAsDataURL(file);

                    } else {
                        validation.showErrors(["Molim Vas odaberite sliku"]);
                        break;
                    }
                }
            }

            $scope.imageIsLoaded = function (e) {
                $scope.$apply(function () {
                    var img = new Image();
                    img.src = e.target.result;
                    var photo = { src: e.target.result, canDelete: true };
                    $scope.gridOptions.photos.push(photo);
                });
            }

            $scope.delete = function (photo) {
                for (var i = 0; i < $scope.gridOptions.photos.length; i++) {
                    if ($scope.gridOptions.photos[i] == photo) {
                        $scope.gridOptions.photos.splice(i, 1);
                        break;
                    }
                }
            }

            $scope.sendForApproval = function () {
                var photosToSend = [];

                for (var i = 0; i < $scope.gridOptions.photos.length; i++) {
                    var photo = { prodavacId: $localStorage.userId, src: $scope.gridOptions.photos[i].src }
                    photosToSend.push(photo);
                }
                var response = {
                    photosToSend = photosToSend;
                    companyId = $scope.selectedCompany.id;
                }
                httpRequest.sendForApproval(response).then(function (response) {
                    msgDialog.open("Slike su poslate na ocenjivanje");
                    for (var i = 0; i < $scope.gridOptions.photos.length; i++) {
                        $scope.gridOptions.photos[i].canDelete = false;
                    }
                    $scope.alreadySent = true;
                });
            }
            getCompanies();
            getPhotosForUser();
        }]);
