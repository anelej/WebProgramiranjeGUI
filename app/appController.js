
angular.module('controllers.app', ['ngStorage', 'services.httpRequest'])
    .controller('appController', [
        '$rootScope', '$scope', '$localStorage', 'DATE_FORMAT', 'httpRequest', '$window', 'DEFAULT_ROUTE', '$location', 'msgDialog',
        function ($rootScope, $scope, $localStorage, DATE_FORMAT, httpRequest, $window, DEFAULT_ROUTE, $location, msgDialog) {
            'use strict';
            $rootScope.global = {
                dateTimeFormat: '',
                dateFormat: '',
                timeFormat: '',
                pageTitle: 'Prodaja Fotografija'
            };
            $rootScope.isSplashVisible = true;

            $rootScope.logout = function () {
                $localStorage.username = null;
                $localStorage.password = null;
                $rootScope.role = null;
                $rootScope.isLoggedIn = false;
                // $window.location.href = DEFAULT_ROUTE.loginRoute;
            };

            $rootScope.deactivate = function () {
                httpRequest.deactivate($localStorage.userId).then(function (response) {
                    msgDialog.open("Deaktivirali ste svoj nalog");
                    $rootScope.logout();
                });
            }

            function removeSplash() {
                $rootScope.isSplashVisible = false;

            }

            $scope.setClientdateFormat = function () {
                if (!$localStorage.dateTimeFormat) {
                    $localStorage.dateTimeFormat = DATE_FORMAT.SRBDateTimeFormat;
                }
                if (!$localStorage.dateFormat) {
                    $localStorage.dateFormat = DATE_FORMAT.SRBDateFormat;
                }
                if (!$localStorage.timeFormat) {
                    $localStorage.timeFormat = DATE_FORMAT.SRBTimeFormat;
                }

                $rootScope.global.dateTimeFormat = $localStorage.dateTimeFormat;
                $rootScope.global.dateFormat = $localStorage.dateFormat;
                $rootScope.global.timeFormat = $localStorage.timeFormat;
            };

            $scope.setClientdateFormat();
            removeSplash();
        }
    ]);