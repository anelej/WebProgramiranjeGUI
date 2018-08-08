angular.module('controllers.deactivateUser', ['services.validation'])
    .controller('deactivateUserController', [
        '$scope', '$rootScope', 'validation', 'msgDialog', 'httpRequest', '$location', 'DEFAULT_ROUTE', '$localStorage',
        function ($scope, $rootScope, validation, msgDialog, httpRequest, $location, DEFAULT_ROUTE, $localStorage) {
            'use strict';

            $scope.gridOptions = {
                users: [],
                countries: []
            };
            $scope.selectedUser = {};
            $scope.selectedCountry = {};

            $scope.onUserClick = function(user) {
                $scope.selectedUser = user;
                for(var i = 0; i < $scope.gridOptions.countries.length; i++) {
                    if ($scope.gridOptions.countries[i].id == user.drzavaId) {
                        $scope.selectedCountry = $scope.gridOptions.countries[i];
                        break;
                    }
                }
            }

            $scope.deactivate = function () {
                httpRequest.deactivate($scope.selectedUser.id).then(function (response) {
                    msgDialog.open("Korisnik je deaktiviran");
                    getUsers();
                });
            }

            function getUsers() {
                httpRequest.getUsers().then(function (response) {
                    $scope.gridOptions.users = response;
                });
            }

            function getCountries() {
                httpRequest.getCountries().then(function (response) {
                  $scope.gridOptions.countries = response;
                });
              }

            getCountries();
            getUsers();
        }
    ]);