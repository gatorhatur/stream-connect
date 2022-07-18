
const tmdbApiKey = "346f7b7cb4a8eacfd5f60caf07af955f";
const rapidApiKey = "4de443414emsh4a4ea1571d88c69p17feeajsn6962f58e5c81";
const moviePullLimit = 5;
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


var getMovieId = function (id) {
  const apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key="+tmdbApiKey+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_people="+id+"&with_watch_monetization_types=flatrate"
  console.log(apiUrl);

  //clear movies in the event of the function being called again
  movies = [];

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
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
        })
      })
    }
    else {
      //trigger modal
      console.log("Response no ok");
    }
  })
}

var getMovieInfo = function (movieId) {
    const options = {
        method: 'GET',
        headers: {
            // 'X-RapidAPI-Key': 'f7d7f2fe88msh572b312c212385cp1f28e8jsn8e41ff9814a4',
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    //var movieId = "120";

    var movieInfo = "https://streaming-availability.p.rapidapi.com/get/basic?country=us&tmdb_id=movie%2F" + movieId + "&output_language=en";

    fetch(movieInfo, options)
      .then(response => {
        if (!response.ok) { 
          if (response.status === 429) {
            return console.log(response.error)
          }
          console.log("Something went wrong");
          return console.log(response);
         }
        return response.json()
      })
      .then((data) => {
        console.log(data);
            //console.log(data.cast);
            //console.log(data.streamingInfo);

            var cast = data.cast;
            var streamingInfo = data.streamingInfo;

          console.log(cast, streamingInfo);
            return (cast, streamingInfo);
        })
      .catch(err => console.error(err));
}

var sleep = function(ms){
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var waitForMovieInfo = async function (movieId) {

  await sleep(400);
  await getMovieInfo(movieId);
  
  //console.log(result);
}

//getMovieInfo();

