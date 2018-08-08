angular.module('controllers.addCard', ['services.validation'])
    .controller('addCardController', [
        '$scope', '$rootScope', 'validation', 'msgDialog', 'httpRequest', '$location', 'DEFAULT_ROUTE', '$localStorage',
        function ($scope, $rootScope, validation, msgDialog, httpRequest, $location, DEFAULT_ROUTE, $localStorage) {
            'use strict';

            $scope.isEditMode = false;
            $scope.gridOptions = {
                cards: []
            }
            $scope.newCard = {
                KorisnikId: $localStorage.userId
            };

            $scope.onCardClick = function (card) {
                $scope.newCard = angular.copy(card);
                $scope.isEditMode = true;
            }

            $scope.addNewCard = function () {
                $scope.newCard = {
                    korisnikId: $localStorage.userId
                };
                $scope.isEditMode = false;
            }

            $scope.save = function () {
                var errorList = [];
                validation.mandatoryString($scope.newCard.brojKartice, "Broj kartice", errorList);

                if (errorList.length === 0) {
                    if ($scope.isEditMode) {
                        httpRequest.updateCard($scope.newCard).then(function (response) {
                            msgDialog.open("Kartica je sacuvana");
                            getCards();
                            $scope.isEditMode = false;
                        });
                    } else {
                        httpRequest.addCard($scope.newCard).then(function (response) {
                            msgDialog.open("Kartica je sacuvana");
                            getCards();
                        });
                    }

                } else {
                    validation.showErrors(errorList);
                }
            }

            function getCards() {
                httpRequest.getCards($localStorage.userId).then(function (response) {
                    $scope.gridOptions.cards = response.result;
                });
            }

            getCards();
        }
    ]);