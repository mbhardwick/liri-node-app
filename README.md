# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies. 

## Getting Started
	*clone this repository to your computer
	*cd into the repo
	*run npm install

## Running the App
*Into the command line type ```node liri.js```
	*To lookup a concert type ```concert-this [band name]```
	*To lookup a song on Spotify type ```spotify-this-song [song name]```
	*To lookup a movie type ```movie-this [movie name]```
* *OR* give liri a command by typing it into the random.txt file using ```[command],"[search query]" ``` then in the command line type ```do-what-it-says```
*All queries will be logged to log.txt


## Examples

![Image of concert-this](images/concert.png)
![Image of spotify-this-song](images/spotify.png)
![Image of movie-this](images/movie.png)
![Image of do-what-it-says](images/do.png)

### Extras
*If the search query for songs or movies is left blank they will default to The Sign by Ace of Base and Mr. Nobody.

![Image of spotify default](images/spotify2.png)

## Built With
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [Axios](https://www.npmjs.com/package/axios)

  * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

* [Moment](https://www.npmjs.com/package/moment)

* [DotEnv](https://www.npmjs.com/package/dotenv)

## Authors

* Maribeth Hardwick

## Acknowledgments
Made while enrolled in the University of Washington Coding Bootcamp