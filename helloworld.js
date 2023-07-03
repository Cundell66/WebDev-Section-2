const prompt = require('prompt-sync')();

const tweet = prompt('Emter your tweet');
tweetUnder140 = tweet.slice(0,140);
tweetUnder140 = tweetUnder140.toUpperCase();

console.log(tweetUnder140);