angular.module('controllers.companyRegistration', ['services.httpRequest'])
    .controller('companyRegistrationController',
        ['$scope', '$rootScope', '$localStorage', 'httpRequest', 'DEFAULT_ROUTE', '$location',
            function ($scope, $rootScope, $localStorage, httpRequest, DEFAULT_ROUTE, $location) {
                'use strict';

                $scope.newComp = {};

                $scope.registerCompany = function () {
                    var errorList = [];
                    validation.mandatoryString($scope.newComp.ime, "Ime", errorList);
                    validation.mandatoryString($scope.newComp.lokacija, "Lokacija", errorList);
                    validation.mandatoryString($scope.newComp.pib, "PIB", errorList);

                    if (errorList.length === 0) {
                        httpRequest.registerComp($scope.newComp).then(function (response) {
                            msgDialog.open("Uspesno ste poslali zahtev za registraciju", "Registracija uspesna");
                            $location.path(DEFAULT_ROUTE.loginRoute);
                        });
                    } else {
                        validation.showErrors(errorList);
                    }

                }

            }]);