const express =require('express');
const path=require('path');
const bcrypt=require('bcrypt');
const collection = require("./config");



const app=express();
//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended:false}));




//use ejs as an view engine
app.set('view engine','ejs')
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("login");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})

//register user
app.post("/signup",async(req,res)=>{
    const data={
        name:req.body.username,
        password:req.body.password
    }
    //check if user already exists
    const existingUser=await collection.findOne({name:data.name});
    if(existingUser){
        res.send("The username already exists please use a different name");
    }

    else{
        //hash password using bycrypt
        const saltRounds=10;
        const hashpassword=await bcrypt.hash(data.password,saltRounds);
        data.password=hashpassword;
        const userdata= await collection.insertMany(data);
        console.log(userdata);
    }
})
//login user
app.post("/login",async(req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.username});
        if(!check){
            res.render("Username cannnot be found");

        }
        //compare hashpassword with plain text
        const isPassword=await bcrypt.compare(req.body.password,check.password);
        if(isPassword){
            res.render("home");

        }
        else{
            req.send("wrong password");
        }
        

        



    }
    catch{

        res.send("Wrong username and password");
    }

})

const port =5000;
app.listen(port,()=>{
    console.log(`The sever is running on ${port}`)
})