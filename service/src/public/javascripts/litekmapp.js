'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('litekmApp', [
    'angularBootstrapNavTree',
    'ngAnimate',
    'ngRoute',
    'ui.bootstrap.alert',
    'ui.bootstrap.rating',
    'ui.bootstrap.modal',
    'ui.bootstrap.popover',
    'ui.bootstrap.tooltip',
    'ngUpload',
    'litekmApp.filters',
    'litekmApp.services',
    'litekmApp.directives',
    'litekmApp.controllers'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'KmLoginController'});
    $routeProvider.when('/logout', {templateUrl: 'partials/logout.html', controller: 'KmLogoutController'});
    $routeProvider.when('/admin', {templateUrl: 'partials/admin.html', controller: 'KmAdminController'});
    $routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'KmMainController'});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'KmAboutController'});
    $routeProvider.otherwise({redirectTo: '/main'});
}]);



