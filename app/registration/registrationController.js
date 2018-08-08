angular.module('controllers.registration', ['services.validation'])
  .controller('registrationController', [
    '$scope', '$rootScope', 'validation', 'msgDialog', 'httpRequest', '$location', 'DEFAULT_ROUTE',
    function ($scope, $rootScope, validation, msgDialog, httpRequest, $location, DEFAULT_ROUTE) {
      'use strict';

      $scope.gridOptions = {
        countries: []
      }
      $rootScope.isSplashVisible = false;
      $scope.newUser = {};
      $scope.selectedCountry = {};

      function getCountries() {
        httpRequest.getCountries().then(function (response) {
          $scope.gridOptions.countries = response;
        });
      }

      $scope.onCountryChange = function () {
        $scope.newUser.drzavaId = $scope.selectedCountry.id;
      }

      $scope.register = function () {
        var errorList = [];
        validation.mandatoryString($scope.newUser.username, "Username", errorList);
        validation.mandatoryString($scope.newUser.password, "Password", errorList);
        validation.mandatoryEmail($scope.newUser.email, "Email", errorList);

        if (errorList.length === 0) {
          httpRequest.registerUser($scope.newUser).then(function (response) {
            msgDialog.open("Uspesno ste se registrovali, molim Vas potvrdite registraciju klikom na link u mailu", "Registracija uspesna");
            $rootScope.isLoggedIn = false;
            $location.path(DEFAULT_ROUTE.loginRoute);
          });
        } else {
          validation.showErrors(errorList);
        }
      }

      getCountries();
    }
  ]);