const fs = require("fs");
// let message = "Hello World"
// fs.writeFile("message.txt", message, (err) => {
//     if (err)
//     console.log(err);
//   else {
//     console.log("File written successfully\n");
//     console.log("The written has the following contents:");
//   }
// });

fs.readFile('message.txt', 'utf8', (err,  data) => {
    if (err) throw err;
    console.log(data);
  }); 
// console.log(message);