
const tmdbApiKey = "346f7b7cb4a8eacfd5f60caf07af955f";
const rapidApiKey = "4de443414emsh4a4ea1571d88c69p17feeajsn6962f58e5c81";
const providers = [
    {
        name: "netflix",
        logo_path: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg"
    },
    {
        name: "hulu",
        logo_path: "/zxrVdFjIjLqkfnwyghnfywTn3Lh.jpg"
    },
    {
        name: "amazon prime",
        logo_path: "/emthp39XA2YScoYL1p0sdbAH2WA.jpg"
    }
]

let movies = [];
var actorId = ""

console.log("Script files is working");

document.addEventListener('DOMContentLoaded', function () {
    var options = {
        edge: "left"
    };
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);    
  });
//initialize tabs
$(document).ready(function(){
    $('.tabs').tabs();
  });

//Search Actor API

var searchActorName = function (name) {
  //set actorId to blank
  actorId = "";

  var actorName = "https://api.themoviedb.org/3/search/person?api_key=346f7b7cb4a8eacfd5f60caf07af955f&language=en-US&query=" + encodeURI(name) + "&page=1&include_adult=false";
  console.log(actorName);


//moved then up to json see commented out portion
fetch(actorName).then(function(res) {
        return res.json();
      }).then(function(data) {
        //console.log(data.results[0].id);
        actorId = data.results[0].id;
        return actorId;
      })//.then(function(data) {
      .catch (function(err) {
        console.log(err);
      })
  

};
