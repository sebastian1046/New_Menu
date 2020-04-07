const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingredient = new Schema({
    name:{
        required:true,
        type: String,
        max: 50,
        min: 2,
        lowercase: true,
        trim:true
    },
    quantity:{
        type:Number,
        max:5000,
        min:1,
        required:true
    },
    measure:{
        type: String,
        lowercase: true,
        required:true,
        max:50,
        min:3,
        trim:true

    }
})
const recipes = new Schema({
    title: {
        required: true,
        type: String,
        max: 100,
        lowercase: true,
        min: 3,
        trim:true
    },
    ingredients: {
        type:[ingredient],
        max: 50,
        min:2,
        lowercase: true,
        trim:true
    },
    show:{
        type: Boolean,
        required: true,
        lowercase: true
    },
    steps:{
        type:[String],
        lowercase: true,
        trim:true
    }
},
{
    timestamps : true
})
 
module.exports = mongoose.model('Recipe', recipes )