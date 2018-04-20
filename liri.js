require("dotenv").config();



let keys = require("./keys.js");
// let Spotfiy = require('node-spotify-api');
let Twitter = require('twitter');
let fs = require("fs");
let request = require("request");
// let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

nodeArg = process.argv;
let userInput = process.argv[2];


// for (let i =3; nodeArg.length; i++){
//     nodeArg += process.argv[i] + "+";
// }
myTweets();
// switch (userInput) {
//     case `my-tweets`:
//         myTweets();
//         break;
//     case `spotify-this-song`:
//         spotifyThis();
//         break;
//     case `movie-this`:
//         movieThis();
//         break;
//     case `do-what-it-says`:
//         justDoIt();      
// }

function myTweets(){
    client.get('statuses/user_timeline', function(error, tweets, response) {
        console.log((tweets));
     });
}
