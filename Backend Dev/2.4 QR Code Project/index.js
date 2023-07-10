/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
    message: "Enter your url: ",
    name: "URL",
    },
  ])
  .then((answers) => {
    const urlTxt = answers.URL;
    var qr_svg = qr.image(urlTxt, {type: 'svg'});

    qr_svg.pipe(fs.createWriteStream('yourURL.svg'));

    var svg_string = qr.imageSync(urlTxt, {type:'svg'});

    fs.writeFile("yourURL.txt", urlTxt, (err) => {
            if (err) console.log(err);});

    })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });

