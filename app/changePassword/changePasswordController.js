angular.module('controllers.changePassword', ['services.dialogs'])
    .controller('changePasswordController', [
        '$scope', '$rootScope', 'httpRequest', '$localStorage', 'DEFAULT_ROUTE', '$location', 'validation', 'msgDialog',
        function ($scope, $rootScope, httpRequest, $localStorage, DEFAULT_ROUTE, $location, validation, msgDialog) {
            'use strict';

            $scope.password = "";
            $scope.newPassword = "";
            $scope.newPasswordConfirm = "";

            function onInit() {
                $scope.password = $rootScope.password;
            }
            
            $scope.changePassword = function() {
                if ($scope.newPassword != $scope.newPasswordConfirm) {
                    var errorList = ["Password nije isti u oba polja"];
                    validation.showErrors(errorList);
                    return;
                };

                var changePasswordDto = {
                    id: $localStorage.userId,
                    password: $scope.newPassword
                };

                httpRequest.changePassword(changePasswordDto).then(function (response) {
                    msgDialog.open("Uspesno ste promenili password", "Promena passworda");
                    $rootScope.password = $scope.newPassword;
                    onInit();
                    $rootScope.isLoggedIn = true;
                  });
            }

            onInit();
        }]);