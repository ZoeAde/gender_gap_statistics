var appRoutes = angular.module("myApp", ['ngRoute']);

//ANGULAR ROUTES
appRoutes.config(function($routeProvider) {
  $routeProvider
        .when('/', {
            templateUrl: 'pages/comment.html',
            controller: 'mainController',
        })
        .when('/bar', {
            templateUrl: 'pages/bar-graph.html',
            controller: 'mainController',
        })
        .when('/table', {
            templateUrl: 'pages/table.html',
            controller: 'mainController',
        })
        .when('/company-stats/:id', {
            templateUrl: 'pages/company-stats.html',
            controller: 'mainController',
        })
        .when('/verticalBar', {
            templateUrl: 'pages/verticalBar.html',
            controller: 'mainController',
        })
        .otherwise({
            redirectTo: '/'
        });
});
