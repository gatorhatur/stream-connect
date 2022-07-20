
var movieTitleContainer = document.getElementById("movie-title-container");
var movieTitle = document.getElementById("movie-title")


const tmdbApiKey = "346f7b7cb4a8eacfd5f60caf07af955f";
const rapidApiKey = "4de443414emsh4a4ea1571d88c69p17feeajsn6962f58e5c81";
const moviePullLimit = 3;
const providers = {
  netflix: "/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
  hulu: "/zxrVdFjIjLqkfnwyghnfywTn3Lh.jpg",
  amazon: "/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
  hotstar: "/7Fl8ylPDclt3ZYgNbW2t7rbZE9I.jpg",
  disney: "/v8vA6WnPVTOE1o39waNFVmAqEJj.jpg",
  hbo: "/Ajqyt5aNxNGjmF9uOfxArGrdf3X.jpg",
  peacock: "/8VCV78prwd9QzZnEm0ReO6bERDa.jpg",
  paramount: "/xbhHHa1YgtpwhC8lb1NQ3ACVcLd.jpg",
  starz: "/zVJhpmIEgdDVbDt5TB72sZu3qdO.jpg",
  showtime: "/4kL33LoKd99YFIaSOoOPMQOSw1A.jpg",
  apple: "/6uhKBfmtzFqOcLousHwZuzcrScK.jpg",
  mubi: "/bVR4Z1LCHY7gidXAJF5pMa4QrDS.jpg",
  stan: "/rDd7IEBnJB0gPagFvagP1kK3pDu.jpg",
  now: "/cQQYtdaCg7vDo28JPru4v8Ypi8x.jpg",
  crave: "/gJ3yVMWouaVj6iHd59TISJ1TlM5.jpg",
  all_4: "/kJ9GcmYk5zJ9nJtVX8XjDo9geIM.jpg",
  bbc: "/zY5SmHyAy1CoA3AfQpf58QnShnw.jpg",
  britbox: "/aGIS8maihUm60A3moKYD9gfYHYT.jpg",
  zee5: "/ajbCmwvZ8HiePHZaOVEgm9MzyuA.jpg",
  curiosity: "/67Ee4E6qOkQGHeUTArdJ1qRxzR2.jpg",
  findProvider: function (string) {
    
  }
}
const imageBaseUrl = "https://image.tmdb.org/t/p/original";


let movies = [];
var actorId = ""
let isActor = true;
let page = 1;

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

var submitHandler = async function(event) {
  //console.log($(event.target).attr("data-isActor"));
  //if the target is the search button
if ($(event.target).hasClass("btn")) {
    //get value from input element
  var searchString = $("#search_input").val()
  //check to see if there is input in searcbox, if not pormpt please enter a movie title
  if (!searchString) {
    return alert("please enter a movie title");  
  }
    
  $("#search_input").val("");
}
else if ($(event.target).hasClass("history")) { //if the target has the data-isActor attribute
    var isActor = $(event.target).attr("data-isActor");
    var searchString = $(event.target).text();
    console.log("using history");
}
else {
    return;
}
 

if (isActor.toString() === 'true') { 
    console.log("searching by actor name");
  await searchActorName(searchString);
  await getMovieId(actorId);
}
else {
  console.log("searching by movie name")
  await getMovie(searchString);
}
  await getAllMovieInfo();

  return;

}

// userInputContainer.addEventListener("click", submitHandler);
$("nav").on("click", submitHandler)

//Search Actor API

var searchActorName = function (name) {
  //set actorId to blank
  actorId = "";

  var actorName = "https://api.themoviedb.org/3/search/person?api_key=346f7b7cb4a8eacfd5f60caf07af955f&language=en-US&query=" + encodeURI(name) + "&page=1&include_adult=false";
  //console.log(actorName);


//moved then up to json see commented out portion
 return fetch(actorName).then(function(res) {
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

var getMovieId = function (id) {
  const apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key="+tmdbApiKey+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_people="+id+"&with_watch_monetization_types=flatrate"
  console.log(apiUrl);

  //clear movies in the event of the function being called again
  movies = [];

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //console.log(data);
        //iterate through each element and set data // will need to solve for limits
        data.results.forEach(function (element, index) {

          var movieObj = {
            title: element.original_title,
            id: element.id,
            poster: element.poster_path,
            overview: element.overview,
            streams: ""
          }
          
          movies.push(movieObj);
          return;
        })
      })
    }
    else {
      //trigger modal
      console.log("Response no ok");
    }
  })
}

var getMovieInfo = function (movieId,index) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f7d7f2fe88msh572b312c212385cp1f28e8jsn8e41ff9814a4',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    //var movieId = "120";

    var movieInfo = "https://streaming-availability.p.rapidapi.com/get/basic?country=us&tmdb_id=movie%2F" + movieId + "&output_language=en";

    fetch(movieInfo, options)
        .then(response => response.json())
        .then((data) => {
            //console.log(data.cast);
            //console.log(data.streamingInfo);

            var cast = data.cast;
            var streamingInfo = data.streamingInfo;

          movies[index].overview = cast;
          movies[index].streams = streamingInfo;

          updateStreamInfo(index);
        })
        .catch(err => console.error(err));
}

var getAllMovieInfo = async function () {
  var startIndex = page * moviePullLimit - moviePullLimit;
  var constraint = moviePullLimit * page;
  //console.log(startIndex, constraint);
  
  for (var i = startIndex; i < constraint; i++){
    await getMovieInfo(movies[i].id, i);
  }
}

//parameter is the index of the movie in the movies object array
var updateStreamInfo = function (index) {
  //declare empty streams object array
  var streamsObj = []
  //declare array of strings containing the keys of the streaming services
  var streams = Object.keys(movies[index].streams);
  //if length is 0 then set streaming info to null
  if (streams.length === 0) {
    movies[index].streams = null;
    return
  }

  //iterate through each streaming service, setting the name, poster url, and direct link to content
  streams.forEach(function (element) {
    var stream = {
      name: element,
      poster: imageBaseUrl + providers[element],
      link: movies[index].streams[element].us.link
    }
    //push the individual stream info into the streamsObj array
    streamsObj.push(stream);
  })
  
  //replace the streaming info for the current movie
  movies[index].streams = streamsObj;
  return;
  
}

$(".switch").on("change", function (event) {
  if (isActor) {
    isActor = false;
  }
  else {
    isActor = true;
  }
})


