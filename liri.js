require("dotenv").config();
//Packages
var fs = require('fs');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var keys = require("./keys.js");
var moment = require('moment');
//Concert-This
var concertThis = function(artist){
    axios.get('https://rest.bandsintown.com/artists/'+artist+'/events?app_id=codingbootcamp')
    .then(function(response){
        for (var i=0;i<response.data.length; i++){
            console.log('Venue Name: '+response.data[i].venue.name);
            console.log('Venue Location: '+response.data[i].venue.city+', '+response.data[i].venue.region+' '+response.data[i].venue.country);
            console.log('Concert Date: '+moment(response.data[i].datetime).format('L'));
            console.log('-------------------------------------------------')
        }
    });
}
//Spotify-This-Song
var spotify = new Spotify(keys.spotify);
var artistNames = function(artist) {
    return artist.name;
}
//Default Output
var spotifyThis = function(songName){
    if (!songName) {
        songName = "The Sign Ace of Base";
    }
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
    //Default Output
    if (!movieName) {
        movieName = "Mr. Nobody";
    }
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
//Do-What-It-Says
var doThis = function(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        if (err){
            console.log(err);
        }
        var readArr = data.split(',');
        spotifyThis(readArr[1]);
    })
};
//Switch function
var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'concert-this':
            concertThis(functionData);
            break;
        case 'spotify-this-song':
            spotifyThis(functionData);
            break;
        case 'movie-this':
            movieThis(functionData);
            break;
        case 'do-what-it-says':
            doThis(functionData);
            break;
        default:
            console.log('LIRI does not know that');
    }
};
//Function to take in the arguments
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};
runThis(process.argv[2], process.argv[3]);