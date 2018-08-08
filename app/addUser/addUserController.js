angular.module('controllers.addUser', ['services.dialogs'])
    .controller('addUserController', [
        '$scope', '$rootScope', 'httpRequest', 'buyPhotoDialog', '$localStorage', '$location', 'validation', 'msgDialog',
        function ($scope, $rootScope, httpRequest, buyPhotoDialog, $localStorage, $location, validation, msgDialog) {
            'use strict';

            $scope.gridOptions = {
                countries: [],
                roles: [ 
                    {id: 0, naziv: "Kupac"}, 
                    {id: 1, naziv: "Prodavac"}, 
                    {id: 2, naziv: "Operater"}, 
                    {id: 3, naziv: "Admin"} 
                ]
              }
              
              $scope.newUser = {};
              $scope.selectedCountry = {};
              $scope.selectedRole = {};
        
              function getCountries() {
                httpRequest.getCountries().then(function (response) {
                  $scope.gridOptions.countries = response;
                });
              }
        
              $scope.onCountryChange = function () {
                $scope.newUser.drzavaId = $scope.selectedCountry.id;
              }

              $scope.onRoleChange = function () {
                $scope.newUser.uloga = $scope.selectedRole.id;
              }
        
              $scope.addUser = function () {
                var errorList = [];
                validation.mandatoryString($scope.newUser.username, "Username", errorList);
                validation.mandatoryString($scope.newUser.password, "Password", errorList);
                validation.mandatorySelection($scope.newUser.uloga, "Uloga", errorList);
                validation.mandatoryEmail($scope.newUser.email, "Email", errorList);
        
                if (errorList.length === 0) {
                  httpRequest.addUser($scope.newUser).then(function (response) {
                    msgDialog.open("Uspesno ste dodali novog korisnika", "Korisnik dodat u sistem");
                    $scope.newUser = {};
                  });
                } else {
                  validation.showErrors(errorList);
                }
              }
        
              getCountries();
        }]);