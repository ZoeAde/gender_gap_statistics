var JSONURL = 'https://spreadsheets.google.com/feeds/list/0AlZH8QBl60oodEJTdFA5TlZOcDJCMU02RkZoSHF5SHc/od6/public/values?alt=json';

function callback(data){
    var rows = [];
    var cells = data.feed.entry;
    // console.log(cells);
    // console.log(cells[1].gsx$numfemaleeng.$t);
    for (var i = 1; i < cells.length; i++){
        var company = cells[i].gsx$company.$t;
        var female_eng = cells[i].gsx$numfemaleeng.$t;
        var num_eng = cells[i].gsx$numeng.$t;
        var percent_female = cells[i].gsx$percentfemaleeng.$t;
        var rowObj = {company: company, femaleEngineers: female_eng, totalEngineers: num_eng, percentFemale: percent_female};
        // rows.push(rowObj);
        $('#tableBody').append("<tr><td>" + company + "</td><td>" + female_eng + "</td><td>" + num_eng + "</td><td>"+ percent_female + "</td></tr>");
    };
}
//





$(document).ready(function(){

    $.ajax({
        url:JSONURL,
        success: function(data){
            callback(data);
        }
    });

});
