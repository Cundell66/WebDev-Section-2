import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const masterURL = 'https://api.discogs.com/masters/'
const discogsToken = "FNfVuEjSQXaenuhatQWLbFoxbFJbmOEkpacBBckg";
const userName = "cundell";

const id = 35199;
const fetchURL = masterURL+`${id}?token=`+discogsToken;
const trackResult = await axios.get(fetchURL);
const trackList = trackResult.data.tracklist;

// console.log("tracklist :" + trackList);

trackList.forEach((track) => {
     console.log(`Track ${track.position}: ${track.title} (${track.duration})`);
});

