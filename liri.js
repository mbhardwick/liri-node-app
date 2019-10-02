require("dotenv").config();
var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");
var moment = require('moment');

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
    request('http://www.omdbapi.com/?apikey=trilogy&t='+movieName, function(error, response, body){
        if (!error && response.statusCode == 200){
            var data = JSON.parse(body);
            console.log('Title: '+data.Title);
            console.log('Year: '+data.Year);
            console.log('IMDB Rating: '+data.imdbRating);
            console.log('Rotten Tomatoes Rating: '+data.tomatoRating);
            console.log('Country: '+data.Country);
            console.log('Language: '+data.Language);
            console.log('Plot: '+data.Plot);
            console.log('Actors: '+data.Actors);
        }
    });
}
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

