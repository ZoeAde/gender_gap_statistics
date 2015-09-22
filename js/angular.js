var app = angular.module('myApp', ['routes', 'factories']);

app.controller('mainController', ['statisticFactory', '$scope', '$location', '$http', function(statisticFactory, $scope, $location, $http) {

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
    // $scope.allCompanies = totalStats.company;
    // $scope.allFemaleEngineers = totalStats.female_eng;
    // $scope.allEngineers = totalStats.num_eng;
    // $scope.allPercentFemale = totalStats.percent_female;

  });
}]);



