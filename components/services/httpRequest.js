angular.module('services.httpRequest', []);
angular.module('services.httpRequest').factory('httpRequest', [
    '$rootScope', '$http', '$q', 'DATE_FORMAT', 'errorDialog', 'DEFAULT_ROUTE', '$localStorage', '$window', '$location', 'msgDialog',
    function ($rootScope, $http, $q, DATE_FORMAT, errorDialog, DEFAULT_ROUTE, $localStorage, $window, $location, msgDialog) {
        'use strict';
        var httpRequestService = {
            baseUrl: "http://localhost:8080/ProdajaFotografija/rest/"
        };

        httpRequestService.login = function (username, password) {
            var deferred = $q.defer();
            var credentials = {
                'username': username,
                'password': password
            };
            var url = httpRequestService.baseUrl + "korisnik/login";
            $http.post(url, credentials).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open(response.error, "Greska");
                    deferred.reject(response);
                }
            });

            return deferred.promise;
        };

        httpRequestService.autoLogin = function () {
            if ($localStorage.username && $localStorage.password) {
                httpRequest.login($localStorage.username, $localStorage.password).then(function (user) {
                    $localStorage.username = $scope.username;
                    $localStorage.password = $scope.password;
                    $rootScope.password = $scope.password;
                    $rootScope.role = response.uloga;
                    $rootScope.username = $scope.username;
                    $localStorage.userId = response.id;
                    $rootScope.photosPurchased = response.listPurchasePhoto;

                    $location.path(DEFAULT_ROUTE.defaultRoute);
                }).catch(function () {

                });
            }
            else {
                $location.path(DEFAULT_ROUTE.loginRoute);
                // $window.location.href = DEFAULT_ROUTE.loginRoute;
            }
        };


        httpRequestService.getCompanies = function() {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl ;
            $http.get(url,null).success(function(response) {
                if(!response.error) {
                    deferred.resolve(response);
                } else {
                    errorDialog.open(response.error, "Greska");
                    deferred.reject(response);
                }
            });
        }


        httpRequestService.getCountries = function () {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "drzava/getAll";
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open(response.error, "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getCategories = function () {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "FotografijaKategorija/getAll";
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open(response.error, "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getSellers = function () {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "korisnik/getSellers";
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open(response.error, "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getCards = function (id) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "KreditnaKartica/getForUser?id=" + id;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open(response.error, "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

     

        httpRequestService.registerUser = function (user) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "korisnik/register";
            $http.post(url, user).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }


        httpRequestService.registerComp = function (company) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl ;

            $http.post(url, company).success(function(response){
                if(!response.error) {
                    deferred.resolve(response);
                } else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }




        httpRequestService.searchPhoto = function (searchPhoto) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "fotografija/searchPhoto";
            $http.post(url, searchPhoto).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.savePhoto = function (newPhoto) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "fotografija/add";
            var newList = [];
            for (var i = 0; i < newPhoto.listaRezolucija.length; i++) {
                var newListItem = {
                    rezolucija: newPhoto.listaRezolucija[i].rezolucija,
                    cena: newPhoto.listaRezolucija[i].cena
                }
                newList.push(newListItem);
            }
            newPhoto.listaRezolucija = newList;
            $http.post(url, newPhoto).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.addCategory = function (category) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "FotografijaKategorija/add";
            $http.post(url, category).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        } 

        httpRequestService.updateCategory = function (category) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "FotografijaKategorija/update";
            $http.post(url, category).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getPhotoById = function (id, userId) {
            var deferred = $q.defer();
            var config = {
                params: { id: id, korisnikId: userId }
            };
            var url = httpRequestService.baseUrl + "fotografija/getById?id=" + id + "&korisnikId=" + userId;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open(response.error, "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.buyPhoto = function (cart) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "fotografija/buy";
            for (var i = 0; i < cart.length; i++) {
                cart[i].korisnikId = $localStorage.userId;
            }
            $http.post(url, cart).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.ratePhoto = function (ratedPhoto) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "fotografija/oceni";
            $http.post(url, ratedPhoto).success(function (response) {
                if (!response.error) {
                    msgDialog.open("Ocenili ste fotografiju");
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getUnapprovedPhotos = function () {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "fotografija/searchUnapprovedPhoto";
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.approvePhoto = function (photo) {
            var deferred = $q.defer();
            var dto = { fotografijaId: photo.id }
            var url = httpRequestService.baseUrl + "fotografija/odobri";
            $http.post(url, dto).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.deletePhoto = function (photo) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "fotografija/delete?id=" + photo.id;
            $http.delete(url).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.sendForApproval = function (photos) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "fotografija/sendForApproval";
            $http.post(url, photos).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getPhotosFromBuyer = function (id) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "fotografija/getPhotosFromBuyer?id=" + id;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getUsersForTest = function () {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "korisnik/getUsersForTest";
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.userBecomeSeller = function (user) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "korisnik/userBecomeSeller?id=" + user.id;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.userFailTest = function (user) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "korisnik/userFailTest?id=" + user.id;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getSellersOfBougthPhotos = function (userId) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "korisnik/getSellersOfBougthPhotos?id=" + userId;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getCommentsForSeller = function (sellerId) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "komentar/getCommentsForSeller?id=" + sellerId;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.sendComment = function (comment) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "komentar/add";
            $http.post(url, comment).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise; sendComment
        }

        httpRequestService.sendPhotoOnMail = function (ratedPhoto) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "fotografija/sendPhotoOnMail";
            $http.post(url, ratedPhoto).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise; sendComment
        }

        httpRequestService.getAllUsers = function () {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "korisnik/getAll";
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open(response.error, "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getReportForUser = function (id) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "korisnik/getReportForUser?id=" + id;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open(response.error, "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getCategoriesReport = function () {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "FotografijaKategorija/getCategoriesReport";
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open(response.error, "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.addCard = function (card) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "KreditnaKartica/add";
            $http.post(url, card).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.updateCard = function (card) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "KreditnaKartica/update";
            $http.post(url, card).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.getUsers = function () {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "korisnik/getUsersBasedOnRole?role=" + $rootScope.role;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.deactivate = function (userId) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "korisnik/deactivate?id=" + userId;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.changePassword = function (changePasswordDto) {
            var deferred = $q.defer();
            
            var url = httpRequestService.baseUrl + "korisnik/changePassword";
            $http.post(url, changePasswordDto).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.resetPassword = function (username) {
            var deferred = $q.defer();
            
            var url = httpRequestService.baseUrl + "korisnik/resetPassword?username="+username;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.deletePhoto = function (id) {
            var deferred = $q.defer();
            
            var url = httpRequestService.baseUrl + "fotografija/delete?id="+id;
            $http.get(url, null).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }

        httpRequestService.addUser = function (user) {
            var deferred = $q.defer();
            var url = httpRequestService.baseUrl + "korisnik/add";
            $http.post(url, user).success(function (response) {
                if (!response.error) {
                    deferred.resolve(response);
                }
                else {
                    errorDialog.open([response.error], "Greska");
                    deferred.reject(response);
                }
            });
            return deferred.promise;
        }
        return httpRequestService;
    }
]);