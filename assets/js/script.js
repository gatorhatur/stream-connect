
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
    },
    {
        name: "hotstar",
        logo_path: "/7Fl8ylPDclt3ZYgNbW2t7rbZE9I.jpg"
    },
    {
        name: "disney plus",
        logo_path: "/v8vA6WnPVTOE1o39waNFVmAqEJj.jpg"
    },
    {
        name: "hbo max",
        logo_path: "/Ajqyt5aNxNGjmF9uOfxArGrdf3X.jpg"
    },
    {
        name: "peacock",
        logo_path: "/8VCV78prwd9QzZnEm0ReO6bERDa.jpg"
    },
    {
        name: "paramount plus",
        logo_path: "/xbhHHa1YgtpwhC8lb1NQ3ACVcLd.jpg"
    },
    {
        name: "starz",
        logo_path: "/zVJhpmIEgdDVbDt5TB72sZu3qdO.jpg"
    },
    {
        name: "showtime",
        logo_path: "/4kL33LoKd99YFIaSOoOPMQOSw1A.jpg"
    },
    {
        name: "apple tv plus",
        logo_path: "/6uhKBfmtzFqOcLousHwZuzcrScK.jpg"
    },
    {
        name: "mubi",
        logo_path: "/bVR4Z1LCHY7gidXAJF5pMa4QrDS.jpg"
    },
    {
        name: "stan",
        logo_path: "/rDd7IEBnJB0gPagFvagP1kK3pDu.jpg"
    },
    {
        name: "now",
        logo_path: "/cQQYtdaCg7vDo28JPru4v8Ypi8x.jpg"
    },
    {
        name: "crave",
        logo_path: "/gJ3yVMWouaVj6iHd59TISJ1TlM5.jpg"
    },
    {
        name: "all 4",
        logo_path: "/kJ9GcmYk5zJ9nJtVX8XjDo9geIM.jpg"
    },
    {
        name: "bbc iplayer",
        logo_path: "/zY5SmHyAy1CoA3AfQpf58QnShnw.jpg"
    },
    {
        name: "britbox",
        logo_path: "/aGIS8maihUm60A3moKYD9gfYHYT.jpg"
    },
    {
        name: "zee5",
        logo_path: "/ajbCmwvZ8HiePHZaOVEgm9MzyuA.jpg"
    },
    {
        name: "curiosity stream",
        logo_path: "/67Ee4E6qOkQGHeUTArdJ1qRxzR2.jpg"
    }
]

let movies = [];
let isActor = true;


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
            'X-RapidAPI-Key': 'f7d7f2fe88msh572b312c212385cp1f28e8jsn8e41ff9814a4',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    var movieId = "120";

    var movieInfo = "https://streaming-availability.p.rapidapi.com/get/basic?country=us&tmdb_id=movie%2F" + movieId + "&output_language=en";

    fetch(movieInfo, options)
        .then(response => response.json())
        .then((data) => {
            console.log(data.cast);
            console.log(data.streamingInfo);

            var cast = data.cast;
            var streamingInfo = data.streamingInfo;

            return (cast, streamingInfo);
        })
        .catch(err => console.error(err));
}

$(".switch").on("change", function (event) {
  if (isActor) {
    isActor = false;
  }
  else {
    isActor = true;
  }
})

getMovieInfo();

