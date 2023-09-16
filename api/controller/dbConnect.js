const mongoose=require("mongoose")
require('dotenv').config();

const dbURI=process.env.DB_KEY
async function connect(){
    mongoose.connect(dbURI)
    .then((result) => console.log("mongo connected"))
    .catch((err) => console.log(err));
} 

module.exports= connect