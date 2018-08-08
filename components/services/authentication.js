angular.module('services.authentication', ['services.httpRequest', 'services.interceptor', 'ngStorage']);
angular.module('services.authentication').factory('authentication', ['$rootScope', 'httpRequest', 'interceptor', '$localStorage', 'AUTH_EVENTS',
    function ($rootScope, httpRequest, interceptor, $localStorage, AUTH_EVENTS) {
        'use strict';
        var authenticationService = {};

        var user = {
            id: null,
            username: null,
            fullName: null,
            permissions: [],
        };
        var isAuthenticated = false;

        authenticationService.isAuthenticated = function () {
            return isAuthenticated;
        };
        //Does current user have ANY of the required permissions
        authenticationService.isAuthorized = function (requiredPermissions) {
            var actualPermissions = user.permissions;
            if (authenticationService.requireAutehnitaction(requiredPermissions)) {
                if (requiredPermissions.length === 0) {
                    return true;
                }
                for (var i = 0; i < actualPermissions.length; i++) {
                    for (var j = 0; j < requiredPermissions.length; j++) {
                        if (actualPermissions[i].trim() === requiredPermissions[j].trim()) {
                            return true;
                        }
                    }
                }
            }
            else {
                return true;
            }
            return false;
        };
        authenticationService.autoLogin = function () {
            if ($localStorage.username && $localStorage.password) {
                httpRequest.login($localStorage.username, $localStorage.password).then(function (user) {
                    setUser(user);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                }).catch(function () {
                    $rootScope.$broadcast(AUTH_EVENTS.autoLoginFailed);
                });
            }
            else {
                $rootScope.$broadcast(AUTH_EVENTS.autoLoginFailed);
            }
        };
        authenticationService.login = function (username, password, rememberMe) {
            httpRequest.login(username, password).then(function (user) {
                setUser(user);
                if (rememberMe) {
                    $localStorage.username = username;
                    $localStorage.password = password;
                }
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }).catch(function (response) {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed, response);
            });
        };
        authenticationService.logout = function () {
            authenticationService.removeUser();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };
        authenticationService.requireAutehnitaction = function (requiredPermissions) {
            if (!requiredPermissions)
                return false;
            return requiredPermissions.length >= 0;
        };
        authenticationService.setUserLanguage = function (language) {
            $rootScope.appUser.language = language;
            httpRequest.getLocaleJson($rootScope.appUser.language.code).then(function (response) {
                $rootScope.translate = response;
            });
        };
        authenticationService.removeUser = function () {
            interceptor.removeAuthToken();

            user = {
                id: null,
                username: null,
                fullName: null,
                permissions: [],
            };
            isAuthenticated = false;
        };

        function setUser(appUser) {
            interceptor.setAuthToken(appUser.authTicket);
            user = {
                id: appUser.id,
                username: appUser.username,
                fullName: appUser.fullName,
                permissions: appUser.permissions,
                isPasswordChangeNeeded: appUser.isPasswordChangeNeeded,
                employeeId: null,
                language: appUser.language,
            };
            if (appUser.employee) {
                user.employeeId = appUser.employee.id;
            }
            $rootScope.appUser = user;
            isAuthenticated = true;
        };

        return authenticationService;
    }
]);