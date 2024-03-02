require("dotenv").config();
const connectDb = require("./Config/dbConnect.js");
connectDb();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser= require("cookie-parser");
const SECRET = process.env.SECRET;
const User = require("./Model/user.js");
const auth = require("./Middleware/auth.js");
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("welcome here is your api");
});
app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!(firstname && lastname && email && password)) {
     return res.status(400).send("insufficent data");
    }
    //check if the email already exist

    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
     return res.status(400).send("email already exist");
    }
   

    //encrypt the password and create new user
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
        firstname,
        lastname,
        email,
        password:hashedPassword
    });
    const token = jwt.sign({ id: user._id, email }, SECRET, {
      expiresIn: "2h",
    });
    user.password = undefined;
    user.token=token;
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("error in server")
  }
});

app.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!(email&&password))
        {
            res.status(400).send("insuffecient data")
        }
        const user= await User.findOne({email:email});
        if(user && await bcrypt.compare(password,user.password))
        {
            const token=jwt.sign({id:user._id,email},SECRET,{expiresIn:'2h'})
            user.token=token;
            user.password=undefined;
            const options={
                expire:1*24*60*60*1000,
                httpOnly:true
            }
            res.status(200).cookie('token',token,options).json({
                success:true,
                user,
                token
            })
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
})
app.get("/dashboard",auth,(req,res)=>{
    res.status(200).send("welcome to dashboard")
})
module.exports=app;