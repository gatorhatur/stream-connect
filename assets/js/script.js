
var tmdbApiKey = "346f7b7cb4a8eacfd5f60caf07af955f";
var rapidApiKey = "<<4de443414emsh4a4ea1571d88c69p17feeajsn6962f58e5c81>>";
var movieTitleContainer = document.getElementById("movie-title-container");
var movieTitle = document.getElementById("movie-title")
var movies = []
var userInputContainer = $("nav");



var getMovie = function(movieSting){
  // format the github api Url
  var apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbApiKey + "&language=en-US&query=" + encodeURI(movieSting) + "&page=1&include_adult=false";
// make a request to the url
fetch(apiUrl).then(function(response){
  response.json().then(function(data){
    console.log(data,);
    movies = []
    data.results.forEach(function (element, index) {

      var movieObj = {
        title: element.original_title,
        id: element.id,
        poster: element.poster_path,
        overview: element.overview,
        streams: ""
      }
      
      movies.push(movieObj);
      console.log(movieObj);
      console.log(movieObj.title, movieObj.id);

    })
  })
});
}
// getMovie();

var submitHandler = function(event) {
  console.log(event);
  //is this the search button, 
if ($(event.target).hasClass("btn")){
//get value from input element
 var searchInputForm = $("#search_input").val()
//check to see if there is input in searcbox, if not pormpt please enter a movie title
if (searchInputForm) {
  getMovie(searchInputForm);
  textInput.value = "";
} else{
  alert("please enter a movie title");
}
console.log(event);



}}

// userInputContainer.addEventListener("click", submitHandler);
$("nav").on("click", submitHandler);
