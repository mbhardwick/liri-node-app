require("dotenv").config();
var fs = require('fs');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var keys = require("./keys.js");
var moment = require('moment');
// //Concert-This
// request('https://rest.bandsintown.com/artists/' +Blackstreet+ '/events?app_id=codingbootcamp', function(error, response, body){
//     if(!error)
// })
//Spotify-This-Song
var spotify = new Spotify(keys.spotify);
var artistNames = function(artist) {
    return artist.name;
}
var spotifyThis = function(songName){
    spotify.search({type: 'track', query: songName}, function(err, data) {
        if (err) {
            console.log('Error occurred: '+err);
            return;
        }
        var songs = data.tracks.items;
        for(var i=0; i<songs.length; i++) {
            console.log(i);
            console.log('Artist(s): '+songs[i].artists.map(artistNames));
            console.log('Song Name: '+songs[i].name);
            console.log('Preview Song: '+songs[i].preview_url)
            console.log('Album: '+songs[i].album.name);
            console.log('-----------------------------------------------')
        }
    });
};

//Movie-This
var movieThis = function(movieName){
    axios.get('http://www.omdbapi.com/?apikey=trilogy&t='+movieName)
    .then(function(response){
            console.log('Title: '+response.data.Title);
            console.log('Year: '+response.data.Year);
            console.log('IMDB Rating: '+response.data.imdbRating);
            console.log('Rotten Tomatoes Rating: '+response.data.tomatoRating);
            console.log('Country: '+response.data.Country);
            console.log('Language: '+response.data.Language);
            console.log('Plot: '+response.data.Plot);
            console.log('Actors: '+response.data.Actors);
        })
    };
//Switch function
var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'concert-this':
            concertThis();
            break;
        case 'spotify-this-song':
            spotifyThis(functionData);
            break;
        case 'movie-this':
            movieThis(functionData);
            break;
        case 'do-what-it-says':
            doThis();
            break;
        default:
            console.log('LIRI does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};
runThis(process.argv[2], process.argv[3]);
// //Bands in Town Artist Events
// var concertThis = function(artist) {
//     var queryURL=("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
// };

