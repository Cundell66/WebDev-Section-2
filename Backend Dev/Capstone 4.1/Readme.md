# Discogs Collection Viewer
 This is a web application that allows you to view and explore my Discogs collection. It retrieves data from the Discogs API to display artist, title, sleeve artwork and tracklist of a random selected record from my discogs collection.
 ## Features
 - Displays basic information about each release in my Discogs collection
- Shows the tracklist for each release
- Allows you to navigate through your collection by clicking the "Next" button
- Randomly selects releases from your collection to provide a varied browsing experience
 ## Technologies Used
 - Node.js
- Express.js
- Axios
- EJS (Embedded JavaScript) templating engine
 ## Getting Started
 1. Clone the repository: `git clone https://github.com/Cundell66/WebDev-Section-2/tree/fcc91b7a93accc7030a22aa1c7d8dc9cf55627fb/Backend%20Dev/Capstone%204.1`
2. Install the dependencies: `npm install`
3. Get your Discogs API token by signing up for a free Discogs account at discogs.com. Then, create a `discogs.js` file in the root directory and export your token, username and folder ID. 
Example:

export {discogsToken, userName, folderID};
const discogsToken = "AAaAaAaAAAaaaaaaaAAAaAaaaAAaaAAaaaaAAaaa";
const userName = "jackBauer";
const folderID = 1111111;