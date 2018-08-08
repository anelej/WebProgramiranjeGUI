(function () {
  'use strict';
  // Declare app level module which depends on views, and components
  angular.module('app', [
    'ngRoute', 'ui.bootstrap',
    'controllers.app', 'controllers.default', 'controllers.login', 'controllers.photoSearch', 'controllers.registration', 'controllers.addPhoto', 'controllers.addCategory',
    'controllers.cart', 'controllers.approvePhoto', 'controllers.becomeSeller', 'controllers.rateBuyersPhotos', 'controllers.searchSellers', 'controllers.userReport',
    'controllers.categoryReport', 'controllers.addCard', 'controllers.deactivateUser', 'controllers.changePassword', 'controllers.forgotPassword', 'controllers.addUser', 'controllers.companyRegistration'
  ]);
  angular.module('services.dialogs', []);
  angular.module('services.httpRequest', []);
  angular.module('app').config(['$routeProvider', 'DEFAULT_ROUTE',
    function ($routeProvider, DEFAULT_ROUTE) {
      $routeProvider.when(DEFAULT_ROUTE.loginRoute, {
        templateUrl: 'app/login/login.html',
        controller: 'loginController'
      });
      $routeProvider.when(DEFAULT_ROUTE.defaultRoute, {
        templateUrl: 'app/default/default.html',
        controller: 'defaultController'
      });
      $routeProvider.when(DEFAULT_ROUTE.registrationRoute, {
        templateUrl: 'app/registration/registration.html',
        controller: 'registrationController'
      });
      $routeProvider.when(DEFAULT_ROUTE.companyRegistrationRoute, {
        templateUrl: 'app/companyRegistration/companyRegistration.html',
        controller: 'companyRegistration'
      });
      $routeProvider.when(DEFAULT_ROUTE.photoSearchRoute, {
        templateUrl: 'app/photoSearch/photoSearch.html',
        controller: 'photoSearchController'
      });
      $routeProvider.when(DEFAULT_ROUTE.addPhotoRoute, {
        templateUrl: 'app/addPhoto/addPhoto.html',
        controller: 'addPhotoController'
      });
      $routeProvider.when(DEFAULT_ROUTE.addCategoryRoute, {
        templateUrl: 'app/addCategory/addCategory.html',
        controller: 'addCategoryController'
      });
      $routeProvider.when(DEFAULT_ROUTE.addCartRoute, {
        templateUrl: 'app/cart/cart.html',
        controller: 'cartController'
      });
      $routeProvider.when(DEFAULT_ROUTE.approvePhotoRoute, {
        templateUrl: 'app/approvePhoto/approvePhoto.html',
        controller: 'approvePhotoController'
      });
      $routeProvider.when(DEFAULT_ROUTE.becomeSellerRoute, {
        templateUrl: 'app/becomeSeller/becomeSeller.html',
        controller: 'becomeSellerController'
      });
      $routeProvider.when(DEFAULT_ROUTE.rateBuyersPhotosRoute, {
        templateUrl: 'app/rateBuyersPhotos/rateBuyersPhotos.html',
        controller: 'rateBuyersPhotosController'
      });
      $routeProvider.when(DEFAULT_ROUTE.searchSellersRoute, {
        templateUrl: 'app/searchSellers/searchSellers.html',
        controller: 'searchSellersController'
      });
      $routeProvider.when(DEFAULT_ROUTE.userReportRoute, {
        templateUrl: 'app/userReport/userReport.html',
        controller: 'userReportController'
      });
      $routeProvider.when(DEFAULT_ROUTE.categoryReportRoute, {
        templateUrl: 'app/categoryReport/categoryReport.html',
        controller: 'categoryReportController'
      });
      $routeProvider.when(DEFAULT_ROUTE.addCardRoute, {
        templateUrl: 'app/addCard/addCard.html',
        controller: 'addCardController'
      });
      $routeProvider.when(DEFAULT_ROUTE.deactivateUserRoute, {
        templateUrl: 'app/deactivateUser/deactivateUser.html',
        controller: 'deactivateUserController'
      });
      $routeProvider.when(DEFAULT_ROUTE.changePasswordRoute, {
        templateUrl: 'app/changePassword/changePassword.html',
        controller: 'changePasswordController'
      });
      $routeProvider.when(DEFAULT_ROUTE.forgotPasswordRoute, {
        templateUrl: 'app/forgotPassword/forgotPassword.html',
        controller: 'forgotPasswordController'
      });

      $routeProvider.when(DEFAULT_ROUTE.addUserRoute, {
        templateUrl: 'app/addUser/addUser.html',
        controller: 'addUserController'
      });
      $routeProvider.otherwise({ redirectTo: DEFAULT_ROUTE.defaultRoute });
    }
  ]);
  angular.module('app').config(['$compileProvider',
    function ($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|content|blob‌​|ms-appx|ms-appdata|x-wmapp0|unsafe|local):|data:image\//);
    }
  ]);
  angular.module('app').run(['httpRequest', function (httpRequest) {
    httpRequest.autoLogin();
  }]);
})();
