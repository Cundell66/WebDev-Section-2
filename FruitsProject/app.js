//jshint esversion:6

import mongoose, { connect, Schema, model } from 'mongoose';
 
//Connection to MongoDB database
//⁡⁢⁣⁣This line will specify the port where we will access our MongoDB Server
//⁡⁢⁣⁣Here "fruitsDB" is the name of the database where we want to connect to.⁡
connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});
 
//Here we create new blueprint of our database(Schema)
//This lays foundation for every new fruit document that will be added to our DB.
const fruitSchema = new Schema({
    name: {
      type: String,
      required: [true, "Name Is Required"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
});
 
const Fruit = model("Fruit", fruitSchema);
 
// const fruit = new Fruit({
// name: "Apple",
//     rating: 10,
//     review: "peaches are yummy"
// })
 


//This save() method in Mongoose is used to save this fruit document into fruit collection inside our fruitsDB
// fruit.save();//Once a collection is saved comment fruit.save() bcoz everytime it will save same thing multiple times.
 
const personSchema = new Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});
 
const Person = model("Person", personSchema);

const grapefruit = new Fruit({
  name: "Grapefruit",
  score: 6,
  review: "Breakfast fruit"
});

// grapefruit.save();

// const person = new Person({
//     name: "Amy",
//     age: 12,
//     favouriteFruit: pineapple
// });

 
// //Guys once you save this person_collection please comment it. Otherwise it will save the same thing multiple times.
// await person.save();

 
 
//How to insert these many fruits at a time? (by using insertMany() method)
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The Best Fruit!"
});
 
const orange = new Fruit({
    name: "Orange",
    rating: 6,
    review: "The Sour Fruit!"
});
 
const banana = new Fruit({
    name: "Banana",
    rating: 8,
    review: "The Digestive  Fruit!"
});
 
//In latest version of mongoose insertMany has stopped accepting callbacks
//instead they use promises(Which Angela has not taught in this course)
//So ".then" & "catch" are part of PROMISES IN JAVASCRIPT.
 
//PROMISES in brief(If something is wrong please correct me):
//In JS, programmers encountered a problem called "callback hell", where syntax of callbacks were cumbersome & often lead to more problems.
//So in effort to make it easy PROMISES were invented.
//to learn more about promise visit : https://javascript.info/promise-basics
//Or https://www.youtube.com/watch?v=novBIqZh4Bk
 
// Fruit.insertMany([grapefruit]) 
//     .then(function(){
//         console.log("Successfully saved all the fruits to fruitsDB");
//     })
//     .catch(function(err){
//         console.log(err);
//     });


Fruit.find()
  .then((fruits)=>{
    fruits.forEach(fruit => {
      console.log(fruit.name);
    });
  })
  .catch((err)=>{
    console.log(err);
  });

await Person.updateOne({name: "John"}, {favouriteFruit: grapefruit})
// await Fruit.deleteOne({name: "Peach"})
  .then(function(){
    console.log("Update Successful");
  })
  .catch(function(err){
    console.log(err);
  })

  // await Person.deleteMany({name: "John"})
  // .then(function(){
  //   console.log("Delection Successful");
  // })
  // .catch(function(err){
  //   console.log(err);
  // })

  await Person.find()
  .then((persons)=>{
    persons.forEach(person => {
      console.log(person);
    });
  })
  .catch((err)=>{
    console.log(err);
  });



mongoose.connection.close();