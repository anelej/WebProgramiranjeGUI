angular.module('services.authEventManager', ['ngStorage', 'services.dialogs', 'services.authentication']);
angular.module('services.authEventManager').factory('authEventManager', ['$rootScope', '$location', '$localStorage', 'AUTH_EVENTS', 'DEFAULT_ROUTE',
    'errorDialog', 'authentication', '$route', '$timeout', 'msgDialog',
    function ($rootScope, $location, $localStorage, AUTH_EVENTS, DEFAULT_ROUTE,
        errorDialog, authentication, $route, $timeout, msgDialog) {
        'use strict';
        var authEventManagerService = {};

        authEventManagerService.init = function () {
            $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, url) {
                var nextUrl;
                if ($rootScope.appUser.isPasswordChangeNeeded) {
                    msgDialog.open('Administrator changed your Password. Please define new one.', 'Password Change Required').then(function () {
                        if ($location.url() !== DEFAULT_ROUTE.userPanelRoute) {
                            $location.path(DEFAULT_ROUTE.userPanelRoute);
                        }
                        else {
                            $route.reload();
                        }
                    })
                }
                else if (url) {
                    nextUrl = url;
                }
                else if ($localStorage.returnUrl) {
                    nextUrl = $localStorage.returnUrl;
                }
                else {
                    nextUrl = DEFAULT_ROUTE.defaultRoute;
                }
                if ($location.url() !== nextUrl) {
                    $location.path(nextUrl);
                } else {
                    $route.reload();
                }
            });

            $rootScope.$on(AUTH_EVENTS.notAuthorized, function (event, url) {
                $timeout(function () {
                    $location.path(DEFAULT_ROUTE.defaultRoute);
                });
            });

            $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
                authentication.autoLogin();
            });

            $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
                $timeout(function () {
                    authentication.removeUser();
                    authentication.autoLogin();
                }
                , 10);
            });

            $rootScope.$on(AUTH_EVENTS.autoLoginFailed, function (event, url) {
                $timeout(function () {
                    $location.path(DEFAULT_ROUTE.loginRoute);
                }
                , 10);
            });

            $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
                $localStorage.password = null;
                $localStorage.username = null;
                $location.path(DEFAULT_ROUTE.loginRoute);
            });
        };
        return authEventManagerService;
    }]);