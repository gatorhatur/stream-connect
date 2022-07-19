var tmdbApiKey = "346f7b7cb4a8eacfd5f60caf07af955f";
var rapidApiKey = "<<4de443414emsh4a4ea1571d88c69p17feeajsn6962f58e5c81>>";
var userInputContainer = document.getElementsByClassName("input-field");
var MovieTitleEl = document.getElementById("search-input");
var movies = []




var getMovie = function(){
  // format the github api Url
  var apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbApiKey + "&language=en-US&query=The%20avengers&page=1&include_adult=false";
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
    })
  })
});
}
getMovie();

var submitHandler = function(event) {
  event.preventDefault();
  console.log(event);
//get value from input element
var searchInputForm = textInput.value.trim();
//check to see if there is input in searcbox, if not pormpt please enter a movie title
if (searchInputForm) {
  getMovie(searchInputForm);
  textInput.value = "";
} else{
  alert("please enter a movie title");
}
console.log(event);
}

//Create a function to accept array of information and movie title parameter
var displayMovies = function(title){
console.log(title);
//clear old content
userInputContainer.textContent = "";
MovieTitleEl.textContent = searchTerm;
//looper over movies
for (var i = 0; i <title.length; i++){
  
}
};

userInputContainer.addEventListener("sumbit", submitHandler);