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
var spotifyThis = function(name){
    spotify.search({type: 'track', query: name}, function(err, data) {
        if (err) {
            console.log('Error occurred: '+err);
            return;
        }
        var songs = data.tracks.items;
        for(var i=0; i<songs.length; i++) {
            console.log(i);
            console.log('artist(s): '+songs[i].artists.map(artistNames));
            console.log('song name: '+songs[i].name);
            console.log('preview song: '+songs[i].preview_url)
            console.log('album: '+songs[i].album.name);
            console.log('-----------------------------------------------')
        }
    });
};

var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'concert-this':
            concertThis();
            break;
        case 'spotify-this-song':
            spotifyThis(functionData);
            break;
        case 'movie-this':
            movieThis();
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

