require("dotenv").config();
//Packages
var fs = require('fs');
var Spotify = require('node-spotify-api');
var axios = require('axios');
var keys = require("./keys.js");
var moment = require('moment');
//Output to log.txt
var logThis = function(logCommand){
    console.log(logCommand);
    fs.appendFile('log.txt', logCommand, function(err){
        if (err){
            return logThis('Error: '+err);
        }
    })
};
//Concert-This
var concertThis = function(artist){
    axios.get('https://rest.bandsintown.com/artists/'+artist+'/events?app_id='+keys.bandsInTown.id)
    .then(function(response){
        logThis('\n----------------------------------------')
        logThis('\nconcert-this: '+artist);
        for (var i=0;i<response.data.length; i++){
            logThis('\n----------------------------------------')
            logThis('\nVenue Name: '+response.data[i].venue.name);
            logThis('\nVenue Location: '+response.data[i].venue.city+', '+response.data[i].venue.region+' '+response.data[i].venue.country);
            logThis('\nConcert Date: '+moment(response.data[i].datetime).format('L'));
        }
    })
};
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
            logThis('Error occurred: '+err);
            return;
        }
        var songs = data.tracks.items;
        logThis('\n----------------------------------------')
        logThis('\nspotify-this-song: '+songName);
        for(var i=0; i<songs.length; i++) {
            logThis('\n----------------------------------------')
            logThis('\n'+i);
            logThis('\nArtist(s): '+songs[i].artists.map(artistNames));
            logThis('\nSong Name: '+songs[i].name);
            logThis('\nPreview Song: '+songs[i].preview_url);
            logThis('\nAlbum: '+songs[i].album.name);
        }
    })
};
//Movie-This
var movieThis = function(movieName){
    //Default Output
    if (!movieName) {
        movieName = "Mr. Nobody";
    }
    axios.get('http://www.omdbapi.com/?apikey='+keys.omdb.id+'&t='+movieName)
    .then(function(response){
        logThis('\n----------------------------------------')
        logThis('\nmovie-this: '+movieName);
        logThis('\n----------------------------------------')
        logThis('\nTitle: '+response.data.Title);
        logThis('\nYear: '+response.data.Year);
        logThis('\nIMDB Rating: '+response.data.imdbRating);
        logThis('\nRotten Tomatoes Rating: '+response.data.tomatoRating);
        logThis('\nCountry: '+response.data.Country);
        logThis('\nLanguage: '+response.data.Language);
        logThis('\nPlot: '+response.data.Plot);
        logThis('\nActors: '+response.data.Actors);
        })
    };
//Do-What-It-Says
var doThis = function(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        if (err){
            logThis(err);
        }
        var readArr = data.split(',');
        logThis('do-what-it-says: ');
        logThis('\n----------------------------------------')
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
            logThis('LIRI does not know that');
    }
};
//Function to take in the arguments
var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};
runThis(process.argv[2], process.argv[3]);
