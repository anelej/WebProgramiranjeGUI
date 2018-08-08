angular.module('services.dialogs')
    .factory('msgDialog', ['$rootScope', '$q', '$modal',
        function ($rootScope, $q, $modal) {
            'use strict';
            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'components/services/dialogs/msgDialog/template.html'
            };
            var msgDialogService = {};
            msgDialogService.open = function (message, title) {

                //Create temp objects to work with since we're in a singleton service
                var tempModalDefaults = {};
                var tempModalOptions = {};

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
            return msgDialogService;
        }])
;