angular.module('controllers.userReport', ['services.validation'])
  .controller('userReportController', [
    '$scope', '$rootScope', 'validation', 'msgDialog', 'httpRequest', '$location', 'DEFAULT_ROUTE',
    function ($scope, $rootScope, validation, msgDialog, httpRequest, $location, DEFAULT_ROUTE) {
      'use strict';

      $scope.gridOptions = {
        users: [],
        photos: []
      }

      $scope.onUserChange = function (id) {
        httpRequest.getReportForUser(id).then(function (response) {
          $scope.gridOptions.photos = response;
        });
      }
      function getAllUsers() {
        httpRequest.getAllUsers().then(function (response) {
          $scope.gridOptions.users = response;
        });
      }


      getAllUsers();
    }
  ]);
