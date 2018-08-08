angular.module('controllers.login', ['services.httpRequest'])
    .controller('loginController',
    ['$scope', '$rootScope', '$localStorage', 'httpRequest', 'DEFAULT_ROUTE', '$location',
        function ($scope, $rootScope, $localStorage, httpRequest, DEFAULT_ROUTE, $location) {
            'use strict';
            $scope.remeberMe = true;
            $rootScope.isSplashVisible = false;
            $rootScope.isLoggedIn = false;
            $scope.username = "";
            $scope.password = "";

            $scope.login = function () {
                httpRequest.login($scope.username, $scope.password).then(function (response) {

                    if ($scope.rememberMe) {
                        $localStorage.username = $scope.username;
                        $localStorage.password = $scope.password;
                    }
                    $localStorage.userId = response.id;
                    $rootScope.photosPurchased = response.listPurchasePhoto;
                    $rootScope.role = response.uloga;
                    $rootScope.username = $scope.username;
                    $rootScope.password = $scope.password;
                    if (response.promenaPassworda) {
                        $rootScope.promenaPassworda = true;
                        $location.path(DEFAULT_ROUTE.changePasswordRoute);
                    } else {
                        $rootScope.isLoggedIn = true;
                        $location.path(DEFAULT_ROUTE.defaultRoute);
                    }
                });
            }

            $rootScope.stylesheets = [
                { href: 'app/login/login.css?v=vrs0.0.3.6', type: 'text/css' }
            ];
        }]);
