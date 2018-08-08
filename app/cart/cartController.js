angular.module('controllers.cart', []).controller('cartController',
    ['$scope', '$rootScope', 'httpRequest', 'validation', '$localStorage', 'msgDialog',
        function ($scope, $rootScope, httpRequest, validation, $localStorage, msgDialog) {
            'use strict';

            $scope.total = 0;

            function compare(a, b) {
                if (a.resolution.cena < b.resolution.cena)
                    return -1;
                if (a.resolution.cena > b.resolution.cena)
                    return 1;
                return 0;
            }

            function init() {
                $scope.total = 0;
                if ($rootScope.cart.length > 3) {
                    $rootScope.cart.sort(compare);
                    $scope.total = $rootScope.cart[0].resolution.cena + $rootScope.cart[1].resolution.cena + $rootScope.cart[2].resolution.cena;
                    for (var i = 3; i < $rootScope.cart.length; i++) {
                        $scope.total += ($rootScope.cart[i].resolution.cena * 0.95)
                    }
                } else {
                    for (var i = 0; i < $rootScope.cart.length; i++) {
                        $scope.total += $rootScope.cart[i].resolution.cena;
                    }
                }
            }

            $scope.delete = function (id) {
                for (var i = 0; i < $rootScope.cart.length; i++) {
                    if ($rootScope.cart[i].photo.id == id) {
                        $rootScope.cart.splice(i, 1);
                        break;
                    }
                }
                init();
            }

            $scope.buy = function() {
                httpRequest.buyPhoto($rootScope.cart).then(function (response) {
                    msgDialog.open("Kupovina je uspesno obavljena, fotografije su Vam poslate na email");
                    for (var i = 0; i < $rootScope.cart.length; i++) {
                        $rootScope.photosPurchased.push($rootScope.cart[i]);
                    }
                    $rootScope.cart.length = 0;
                });
            }

            init();
        }
    ]);
