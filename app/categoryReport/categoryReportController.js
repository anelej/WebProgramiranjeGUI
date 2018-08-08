angular.module('controllers.categoryReport', ['services.dialogs'])
    .controller('categoryReportController', [
        '$scope', '$rootScope', 'httpRequest', '$localStorage', 'DEFAULT_ROUTE', '$location',
        function ($scope, $rootScope, httpRequest, $localStorage, DEFAULT_ROUTE, $location) {
            'use strict';

            $scope.gridOptions = {
                categories: []
            }
            function getcategoriesReport() {
                httpRequest.getCategoriesReport().then(function (response) {
                    $scope.gridOptions.categories = response;
                });
            }

            getcategoriesReport();
        }]);