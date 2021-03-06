'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('litekmApp', [
    'angularBootstrapNavTree',
    'ngAnimate',
    'ngRoute',
    'ngGrid',
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

//app.config(['$routeProvider', function($routeProvider) {
//  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
//  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
//  $routeProvider.otherwise({redirectTo: '/view1'});
//}]);



