require("dotenv").config();

let keys = require("./keys.js");
let Spotify = require('node-spotify-api');
let Twitter = require('twitter');
let fs = require("fs");
let request = require("request");
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);


nodeArg = process.argv;
let userInput = process.argv[2];

switch (userInput) {
    case `my-tweets`:
        myTweets();
        break;
    case `spotify-this-song`:
        userInput = "";
        for (let i = 3; i < nodeArg.length; i++) {
            userInput += nodeArg[i] + " ";
        }
        spotifyThis(userInput);
        break;
    case `movie-this`:
        userInput = "";
        for (let i = 3; i < nodeArg.length; i++) {
            userInput += nodeArg[i] + "+";
        }
        inputChecker();
        break;
    case `do-what-it-says`:
        justDoIt();     
}

function myTweets() {
    client.get('statuses/user_timeline', function (error, tweets, response) {
        // console.log((tweets.text));
        for (let i = 0; i < tweets.length; i++) {
            let alexTweets = tweets[i].text;
            let tweetDates = tweets[i].created_at;
            console.log("\n" + tweetDates + "\n" + alexTweets);
            // console.log(alexTweets);
        }
    });
}

function spotifyThis(x) {
    spotify
        .search({
            type: 'track',
            query: x,
            limit: 1
        })
        .then(function (response) {

            console.log(`Artist:${response.tracks.items[0].album.artists[0].name}`);

            console.log(`Song Name:${response.tracks.items[0].name}`);

            console.log(`Album Name: ${response.tracks.items[0].album.name}`);

            console.log(`Popularity Rating: ${response.tracks.items[0].popularity} `);

            console.log(`Hey check this preview out: ${response.tracks.items[0].preview_url}`);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function inputChecker(){
    if (userInput === "") {
        var m = "Mr.+Nobody";
        movieThis(m);
    }else
    movieThis(userInput);
}


function movieThis(x) {
    request("http://www.omdbapi.com/?t=" + x + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //  console.log(JSON.parse(body));

            console.log(`This is your movie: ${JSON.parse(body).Title}`);

            console.log(`The movie was released in: ${JSON.parse(body).Year}`);

            console.log(`IMDB Rating: ${JSON.parse(body).imdbRating}`);

            console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}`);

            console.log(`This movie was made in: ${JSON.parse(body).Country}`);

            console.log(`This movie is available in the following languages: ${JSON.parse(body).Language}`);

            console.log(`Plot: ${JSON.parse(body).Plot}`);

            console.log(`Actors: ${JSON.parse(body).Actors}`);

            //     // If there were no errors and the response code was 200 (i.e. the request was successful)...
            //     if (!error && response.statusCode === 200) {
        }

    });
}

function justDoIt(){
    fs.readFile('random.txt', "utf-8", function (err, data){
        if (err) {
            return console.log(err); 
        }
        console.log(data);
        var musicInput = data.split(",");
        var actualInput = musicInput[1];
        console.log(musicInput[1]);
        var song = musicInput[1].replace(/"/g, "");
        console.log(song);
        spotifyThis(song);
    })
}
