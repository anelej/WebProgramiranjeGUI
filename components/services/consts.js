angular.module('app')
    .constant('DEFAULT_ROUTE', {
        defaultRoute: '/default',
        loginRoute: '/login',
        registrationRoute: '/registration',
        companyRegistrationRoute: '/companyRegistration',
        photoSearchRoute: '/photoSearch',
        addPhotoRoute: '/addPhoto',
        addCategoryRoute: '/addCategory',
        addCartRoute: '/cart',
        approvePhotoRoute: '/approvePhoto',
        becomeSellerRoute: '/becomeSeller',
        rateBuyersPhotosRoute: '/rateBuyersPhotos',
        searchSellersRoute: '/searchSellers',
        userReportRoute: '/userReport',
        categoryReportRoute: '/categoryReport', 
        addCardRoute: '/addCard', 
        deactivateUserRoute: '/deactivateUser', 
        changePasswordRoute: '/changePassword', 
        forgotPasswordRoute: '/forgotPassword', 
        addUserRoute: '/addUser', 
    })
    
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        autoLoginFailed: 'auth-auto-login-failed',
        invalidCredentials: 'auth-invalid-username-password',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized',
        serverError: 'server-error',
    })
    .constant('GLOBAL_EVENTS', {
        error: 'error',
    })
    .constant('DATE_FORMAT', {
        SRBDateFormat: 'dd.MM.yyyy',
        SRBDateTimeFormat: 'dd.MM.yyyy HH:mm',
        SRBTimeFormat: 'HH:mm',
        timeFormatPattern: 'hh:mm:ss',
    })
;
