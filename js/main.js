//DEFINING ROUTES//
// myApp.run(['$location', '$rootScope', function($location, $rootScope) {
//     $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
//         // test for current route
//         if(current.$$route) {
//             // Set current page title
//             $rootScope.title = current.$$route.title;
//         }
//     });
// }])

//END DEFINING ROUTES//


//ANGULAR FOR TABLE GRAPH//
function createStatisticArray(object) {
  var companyArray = [];
  var totalStats = [];
  for (var i = 0; i < object.length; i++) {
    if (i === 0) {
      var companies = object[0].gsx$company.$t;
      var total_female_eng = object[0].gsx$numfemaleeng.$t;
      var total_num_eng = object[0].gsx$numeng.$t;
      var total_percent_female = object[0].gsx$percentfemaleeng.$t;
      var allStats = new Statistic(companies, Number(total_female_eng), Number(total_num_eng), Number(total_percent_female));
    totalStats.push(allStats);
    } else {
      var company = object[i].gsx$company.$t;
      var female_eng = object[i].gsx$numfemaleeng.$t;
      var num_eng = object[i].gsx$numeng.$t;
      var percent_female = object[i].gsx$percentfemaleeng.$t;
      var idName = object[i].title.$t;
      var stat = new Statistic(company, Number(female_eng), Number(num_eng), Number(percent_female), idName);
      companyArray.push(stat);
    }
  }
  return companyArray;
}

function Statistic(company, female_eng, num_eng, percent_female, idName) {
  this.company = company;
  this.female_eng = female_eng;
  this.num_eng = num_eng;
  this.percent_female = percent_female;
  this.idName = idName;
}

//////////////////////////// ANGULAR /////////////////////
var app = angular.module("myApp", ['ngRoute']);

//ANGULAR ROUTES
app.config(function($routeProvider) {
  $routeProvider
        // .when('/', {
        //     templateUrl: 'pages/welcome.html',
        //     controller: 'welcomeCtrl',
        //     title: 'Gender Gap Defined'
        // })
        .when('/about', {
            templateUrl: 'pages/comment.html',
            controller: 'mainController',
            // title: 'Gender Gap Defined'
        })
        .when('/bar', {
            templateUrl: 'pages/bar-graph.html',
            controller: 'mainController',
            // title: 'Gender Gap Bar Graph'
        })
        .when('/table', {
            templateUrl: 'pages/table.html',
            controller: 'mainController',
            // title: 'Gender Gap Table'
        })
        .when('/company-stats/:id', {
            templateUrl: 'pages/company-stats.html',
            controller: 'mainController',
            // title: 'Gender Gap Company Profile'
        })
        .when('/verticalBar', {
            templateUrl: 'pages/verticalBar.html',
            controller: 'mainController',
            // title: 'Gender Gap Company Profile'
        })
        // .when('/people/:idName', {
        //     templateUrl: 'pages/people.html',
        //     controller: 'mainController',
        //     // title: 'Gender Gap Company Profile'
        // })
        .otherwise({
            redirectTo: '/about'
        });
});

//ANGULAR CONTROLLERS
app.controller('mainController', ['$scope', '$location', '$http', function($scope, $location, $http) {

  $scope.go = function(hash) {
    $location.path(hash);
  };


  $http.get('https://spreadsheets.google.com/feeds/list/0AlZH8QBl60oodEJTdFA5TlZOcDJCMU02RkZoSHF5SHc/od6/public/values?alt=json').success(function(response) {

    var object = response.feed.entry;
    console.log(object);
    var parsedObject = createStatisticArray(object);
    $scope.statistics = parsedObject;
    $scope.sortType = "company";
    $scope.sortReverse = false;
    $scope.searchStats = "";
    $scope.allCompanies = totalStats.company;
    $scope.allFemaleEngineers = totalStats.female_eng;
    $scope.allEngineers = totalStats.num_eng;
    $scope.allPercentFemale = totalStats.percent_female;
    $scope.message = "hello";
  });
}]);



