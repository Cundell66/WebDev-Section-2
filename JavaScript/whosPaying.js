
const friends = ["Angela", "Ben", "Jenny", "Michael", "Chloe"];

function whosPaying(names) {
    
    /******Don't change the code above*******/
        
        //Write your code here.
    var payer = names[Math.floor(Math.random()*names.length)]    
    
    return payer + " is going to buy lunch today!";     
        
    
    
    /******Don't change the code below*******/    
    }

console.log(whosPaying(friends))