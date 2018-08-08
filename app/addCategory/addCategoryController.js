angular.module('controllers.addCategory', ['services.validation'])
.controller('addCategoryController', [
  '$scope', '$rootScope', 'validation', 'msgDialog', 'httpRequest', '$location', 'DEFAULT_ROUTE',
  function ($scope, $rootScope, validation, msgDialog, httpRequest, $location, DEFAULT_ROUTE) {
    'use strict';

    $scope.isEditMode = false;
    $scope.gridOptions = {
        categories: []
    }
    $scope.newCategory = {};
    

    $scope.onCategoryClick = function(category) {
        $scope.newCategory = angular.copy(category);
        $scope.isEditMode = true;
    }

    $scope.addNewCategory = function() {
        $scope.newCategory = {};
        $scope.isEditMode = false;
    }

    $scope.save = function () {
      var errorList = [];
      validation.mandatoryString($scope.newCategory.naziv, "Naziv", errorList);

      if (errorList.length === 0) {
          if ($scope.isEditMode) {
            httpRequest.updateCategory($scope.newCategory).then(function (response) {
                msgDialog.open("Kategorija je sacuvana");
                getCategories();
                $scope.isEditMode = false;
              });
          } else {
            httpRequest.addCategory($scope.newCategory).then(function (response) {
                msgDialog.open("Kategorija je sacuvana");
                getCategories();
              });
          }
          
      } else {
        validation.showErrors(errorList);
      }
    }

    function getCategories() {
        httpRequest.getCategories().then(function (response) {
          $scope.gridOptions.categories = response;
        });
      }

    getCategories();
  }
]);