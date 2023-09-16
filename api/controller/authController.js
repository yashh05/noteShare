const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

function handleErrors(err) {
  console.log(err.message);
  let error = { email: "", password: "" };
  //code for login failures
  if (err.message.includes("incorrect Email")) {
    error.email = "Incorrect Email";
  }
  if (err.message.includes("incorrect password")) {
    error.password = "incorrect password";
  } //now the code is for signup failures
  else {
    if (err.code === 11000) {
      error.email = "that email is already registered";
      return error;
    }

    if (err.message.includes("user validation failed")) {
      Object.values(err.errors).forEach((properties) => {
        error[properties.path] = properties.message;
      });

      return error;
    }
  }

  return error;
}

const maxAge = 60 * 60 * 24 * 3;

function createToken(id) {
  return jwt.sign({ id }, "yash sharma jwt", {
    expiresIn: maxAge,
  });
}

const signup_get = (req, res) => {
  res.status(201).json({ msg: "signup get" });
};

async function signup_post(req, res) {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.create({ firstName, lastName, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
      httpOnly: true,
    });

    res.status(201).json(user);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
}

async function login_post(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("please enter all fields");
    }
      const user = await User.findOne({ email })

      if(!user){
        throw new Error('User not found');
      }
      else{
        if(password=== user.password){
          const token = createToken(user._id);
          res.cookie("jwt", token, {
            maxAge: maxAge * 1000,
            httpOnly: true,
          });
          const new_user={
            ...user,
            password:""
          }
          res.status(200).json(new_user._doc);
        }
        else{
          throw new Error("Incorrect Password")
        }
      }
  } catch (e) {
    console.log(e.message);
    res.status(400).json({error:e.message});
  }
};

async function fetchEmailId(userEmail){
  if(!userEmail) return
  try{
    return  User.findOne({email:userEmail})._id
  }catch(e){
    console.log(e.message);
  }
}

// const login_post=async (req,res)=>{
//      const {email,password}=req.body
//   try{
//     const user= await User.login(email,password)
//     const token=createToken(user._id);
//     res.cookie("jwt",token,{httpOnly:true})
//     res.status(200).json({id: user._id})
//   }
//   catch(e){
//   const error=handleErrors(e);
//   // console.log(error);
//   res.status(400).json({error});
//   }
//     // res.status(201).json({msg:"login post"})
// }

module.exports = { signup_get, signup_post, login_post,fetchEmailId };
