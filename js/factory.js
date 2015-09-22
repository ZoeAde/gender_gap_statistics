angular.module('factories', [])
  .factory('statisticFactory', [function() {
    return {
      //name : function() {... return ____}

    };
  }]);
/////////////////////
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
