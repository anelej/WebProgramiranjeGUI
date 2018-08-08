angular.module('controllers.addPhoto', []).controller('addPhotoController',
    ['$scope', '$rootScope', 'httpRequest', 'validation', '$localStorage', 'msgDialog',
        function ($scope, $rootScope, httpRequest, validation, $localStorage, msgDialog) {
            'use strict';

            $scope.listaRezolucija = [];
            $scope.gridOptions = {};
            $scope.newPhoto = {
                prodavacId: $localStorage.userId,
                listaRezolucija: []
            };
            $scope.selectedCategory = {};
            
            $scope.save = function () {
                var errorList = [];
                validation.mandatoryString($scope.newPhoto.naziv, "Naziv", errorList);
                validation.mandatoryString($scope.newPhoto.src, "Fotografija", errorList);

                if (errorList.length === 0) {

                    httpRequest.savePhoto($scope.newPhoto).then(function (response) {
                        msgDialog.open("Uspesno ste se poslali fotografiju", "Fotografija sacuvana");
                    });
                } else {
                    validation.showErrors(errorList);
                }
            }

            $scope.imageUpload = function (event) {
                if (event.target.files[0].type.split("image")[0] == "") {
                    var file = event.target.files[0];
                    var reader = new FileReader();
                    reader.onload = $scope.imageIsLoaded;
                    reader.readAsDataURL(file);

                } else {
                    validation.showErrors(["Molim Vas odaberite sliku"]);
                }
            }

            $scope.imageIsLoaded = function (e) {
                $scope.$apply(function () {
                    var img = new Image();
                    img.onload = $scope.loaded;
                    img.src = e.target.result;
                    $scope.newPhoto.src = e.target.result;
                });
            }

            $scope.loaded = function (e) {
                $scope.listaRezolucija = [];
                var rezolucija = { rezolucija: "" + this.width + "x" + this.height, isChecked: false };
                $scope.listaRezolucija.push(rezolucija);
                var rezolucija1 = { rezolucija: "" + this.width / 2 + "x" + this.height / 2, isChecked: false }
                $scope.listaRezolucija.push(rezolucija1);
                $scope.$apply();
            }

            $scope.onCategoryChange = function () {
                $scope.newPhoto.fotografijaKategorijaId = $scope.selectedCategory.id;
            }

            function getCategories() {
                httpRequest.getCategories().then(function (response) {
                    $scope.gridOptions.categories = response;
                });
            }

            $scope.toggleResolution = function (resolution) {
                if (resolution.isChecked) {
                    $scope.newPhoto.listaRezolucija.push(resolution);
                } else {
                    for(var i = 0; i < $scope.listaRezolucija.length; i++) {
                        if ($scope.listaRezolucija[i].rezolucija == resolution.rezolucija) {
                            $scope.listaRezolucija.split(i,1);
                        }
                    }
                }
                
            }
            getCategories();
        }]);