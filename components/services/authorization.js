angular.module('services.authorization', ['services.authentication', 'ngStorage']);
angular.module('services.authorization').factory('authorization', ['$rootScope', '$location', '$route', 'authentication', 'AUTH_EVENTS',
    '$localStorage', 'DEFAULT_ROUTE',
    function ($rootScope, $location, $route, authentication, AUTH_EVENTS,
        $localStorage, DEFAULT_ROUTE) {
        'use strict';
        var authorizationService = {};

        authorizationService.init = function () {
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                var nextPath = $location.path();
                var nextRoute = next.$$route;

                if (nextRoute) {
                    if (authentication.isAuthenticated()) {
                        if (!authentication.isAuthorized(nextRoute.requirePermission)) {
                            event.preventDefault();
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, nextRoute.originalPath);
                        }
                        else {
                            if (nextRoute.originalPath !== DEFAULT_ROUTE.loginRoute) {
                                $localStorage.returnUrl = nextRoute.originalPath;
                            }
                        }
                    }
                    else if (authentication.requireAutehnitaction(nextRoute.requirePermission)) {
                       event.preventDefault();
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, nextRoute.originalPath);
                    }
                }
                else if (nextPath !== DEFAULT_ROUTE.loginRoute) {
                    $localStorage.returnUrl = nextPath;
                }
            });
        };

        return authorizationService;
    }]);