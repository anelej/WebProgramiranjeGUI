angular.module('controllers.forgotPassword', ['services.dialogs'])
    .controller('forgotPasswordController', [
        '$scope', '$rootScope', 'httpRequest', '$localStorage', 'DEFAULT_ROUTE', '$location', 'validation', 'msgDialog',
        function ($scope, $rootScope, httpRequest, $localStorage, DEFAULT_ROUTE, $location, validation, msgDialog) {
            'use strict';

            $scope.username = "";
            
            $scope.resetPassword = function () {
                httpRequest.resetPassword($scope.username).then(function (response) {
                    msgDialog.open("Poslat vam je email sa novim passwordom.")
                    $location.path(DEFAULT_ROUTE.loginRoute);
                });
            }
        }]);