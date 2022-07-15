
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

getMovieInfo();
