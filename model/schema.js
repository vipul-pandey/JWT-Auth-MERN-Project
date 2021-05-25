const dotenv= require("dotenv");
const jwt= require('jsonwebtoken');
const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
dotenv.config({path: './config.env'});

const peopleSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        minlength:10
    },
    maths:{
        type:String,
        // required:true
    },
    physics:{
        type:String,
        // required:true
    },
    biology:{
        type:String,
        // required:true
    },
    english:{
        type:String,
        // required:true
    }
    // subjects:[{
        
    //         subject1:{
    //             type:String,
    //             default:0
    //             // required:true
    //         },
    //         subject2:{
    //             type:String,
    //             default:0
    //             // required:true
    //         },
    //         subject3:{
    //             type:String,
    //             default:0
    //             // required:true
    //         },
    //         subject4:{
    //             type:String,
    //             default:0
    //             // required:true
    //         }
    //  } ]
}); 
// hassed password
peopleSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 12);
    }
    next(); 
});

const People = new mongoose.model('People', peopleSchema);
module.exports= People;