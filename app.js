const mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitDB', { useUnifiedTopology: true, useNewUrlParser: true})

// ******* Can also be done like this ****************

// const { Schema } = mongoose;
// const fruitSchema = new Schema({});

// **************************************************

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please, check your data entry, no name is specified!" ]
    },
    rating: {
        type: Number,
        min: 1,
        max:10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit ({
//     name: "Apple",
//     rating: 7,
//     review: "Pretty solid as a fruit."
// })

// fruit.save();

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "This is pineapple"
})

pineapple.save();

// establishing relationship b/w fruits and People's collection

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Aanchal",
    age: 21,
    favouriteFruit: pineapple
})

person.save();

// ******* Insert Many *******************************

const kiwi = new Fruit ({
    name: "kiwi",
    rating: 6,
    review: "This is kiwi."
})

const orange = new Fruit({
    name: "orange",
    rating: 8,
    review: "This is orange."
})

const banana = new Fruit({
    name: "banana",
    rating: 9,
    review: "This is banana."
})

Fruit.insertMany([kiwi, orange, banana], function(err){
    if(err){
        console.log("error");
    }else{
        console.log("Successfully saved all fruits");
    }
});

// ***************************************************

// ******* Find **************************************

Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }else{
        mongoose.connection.close();
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        })
    }
})

// ***************************************************

// ******* update ************************************

Fruit.updateOne({ _id: "5ee64217bd032302cab2601c"}, {rating: 10}, function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Successfully updated the document!");
    }
})

// ***************************************************


// ******* Delete ************************************

Fruit.deleteOne({ _id: "5ee64217bd032302cab2601a"}, function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Successfully deleted the document");
    }
})

// ***************************************************
