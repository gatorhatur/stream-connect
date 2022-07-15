const tmdbApiKey = "346f7b7cb4a8eacfd5f60caf07af955f";
const rapidApiKey = "4de443414emsh4a4ea1571d88c69p17feeajsn6962f58e5c81";

console.log("Script files is working");
//initialize tabs
$(document).ready(function(){
    $('.tabs').tabs();
  });

//Search Actor API

var searchActorName = function(name) {
  var actorName = "https://api.themoviedb.org/3/search/person?api_key=346f7b7cb4a8eacfd5f60caf07af955f&language=en-US&query=" + encodeURI(name) + "&page=1&include_adult=false";
  console.log(actorName);

fetch(actorName).then(function(res) {
  return res.json()
}).then(function(data) {
  console.log(data.results[0].id);
  var actorId = data.results[0].id;
  return parseInt(actorId);
}).catch(function(err) {
  console.log(err);
})

};