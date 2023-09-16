const mongoose=require('mongoose');
const {isEmail}=require("validator")

const userSchema= mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"enter first name"],
        lowercase:[true],
    },
    lastName:{
        type:String,
        required:[true,"enter last name"],
        lowercase:[true],
    }, 
    email:{
        type:String,
        required:[true,"Email is required"],
        unique : true,
        lowercase:true,
        validate:[isEmail,"please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        minlength:[6,"minimum length of password should be 6"],
    }
})

const User= mongoose.model("user",userSchema);

module.exports=User;