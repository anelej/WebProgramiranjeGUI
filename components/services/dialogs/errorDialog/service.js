angular.module('services.dialogs')
    .factory('errorDialog', ['$rootScope', '$q', '$modal',
        function ($rootScope, $q, $modal) {
            'use strict';

            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'components/services/dialogs/errorDialog/template.html'
            };

            var errorDialogService = {};
            errorDialogService.open = function (message, title) {

                //Create temp objects to work with since we're in a singleton service
                var tempModalDefaults = {};
                var tempModalOptions = {};
                title = title || "Greska";

                //Map angular-ui modal custom defaults to modal defaults defined in service
                angular.extend(tempModalDefaults, modalDefaults);

                tempModalOptions.headerText = title;
                tempModalOptions.bodyText = message;

                if (!tempModalDefaults.controller) {
                    tempModalDefaults.controller = function ($scope, $modalInstance) {
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function () {
                            $modalInstance.close();
                        };
                    };
                }
                
                return $modal.open(tempModalDefaults).result;
            };
            errorDialogService.displayError = function (errorCodes) {
                var title = 'Error';
                var message = '';
                _.each(errorCodes, function (errorCode) {
                    var error = _.where(ERROR_MESSAGES.errorCodes, { key: errorCode });
                    if (error.length === 1) {
                        message += error[0].message + '\n';
                    }
                    else if (error.length > 1) {
                        message += 'Multiple errors with  error code: ' + errorCode;
                    }
                    else {
                        message += 'Unknown error code: ' + errorCode;
                    }
                });
                errorDialogService.open(message, title);
            };
            return errorDialogService;
        }]);