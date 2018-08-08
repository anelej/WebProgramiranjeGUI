angular.module('services.validation', ['services.dialogs']);
angular.module('services.validation').factory('validation', ['errorDialog', '$rootScope',
    function (errorDialog, $rootScope) {
        'use strict';
        var validationService = {};
        var maxFileSize = 5 * 1024;//Kb
        validationService.mandatoryDate = function (value, fieldName, errorList) {
            if (!value) {
                var error = "Polje " + fieldName + " je obavezno"
                errorList.push(error);
                return false;
            }
            else if (_.isDate(value)) {
                return true;
            }
            else {
                var error = fieldName + " nije u odgovarajucem formatu";
                errorList.push(error);
                return false;
            }
        };
        validationService.mandatorySelection = function (value, fieldName, errorList) {
            if (value > 0) {
                return true;
            }
            else {
                var error = "Niste selektovali nijednu opciju za " + fieldName;
                errorList.push(error);
                return false;
            }
        };
        validationService.mandatoryNumber = function (value, fieldName, errorList) {
            if (_.isNumber(value)) {
                return true;
            }
            else {
                var error = "Polje " + fieldName + " je obavezno";
                errorList.push(error);
                return false;
            }
        };
        validationService.mandatoryString = function (value, fieldName, errorList) {
            if (value && value.length > 0) {
                return true;
            }
            else {
                var error = "Polje " + fieldName + " je obavezno";
                errorList.push(error);
                return false;
            }
        };

        validationService.email = function (value, fieldName, errorList) {
            var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (value && re.test(value)) {
                return true;
            }
            else {
                var error = fieldName + " nije u odgovarajucem formatu";
                errorList.push(error);
                return false;
            }
        };
        validationService.mandatoryEmail = function (value, fieldName, errorList) {
            if (validationService.mandatoryString(value, fieldName, errorList) &&
                validationService.email(value, fieldName, errorList))
                return true;
            else {
                return false;
            }
        };
        validationService.showErrors = function (errorList) {
            errorDialog.open(errorList, "Greska");
        };
        return validationService;
    }]);