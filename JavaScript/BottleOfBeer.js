var bottles = 99;

while(bottles > 0){
    console.log(bottles + " bottles of beer on the wall, " + bottles + " bottles of beer");
    if (bottles == 1){
        console.log("take 1 down, pass it around, no more bottles of beer on the wall ");
    }
    else{
        console.log("take 1 down, pass it around, " + (bottles-1) + " bottles of beer on the wall");
    }
    bottles--;
}
console.log("go to the store and buy some more 99 bottles of beer on the wall");
    