const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cookieParser());

// IMPORTANT : Read it
// for saving the cookie on the browser
// app.get("/",function(req,res){
//     res.cookie("name" , "Rohit");
//     res.send("done");
// })

app.get("/",function(req,res){
    let token = jwt.sign({email: "rohitrover@gmail.com"},"secret");
    res.cookie("token",token);
    console.log(token);
    res.send("cookie token saved");
});

app.get("/test",function(req,res){
    console.log(req.cookies.token);
    res.send("check the terminal for output");
});

app.get("/read",function(req,res){
    res.send("Read page");
    console.log(req.cookies);
});

app.get("/password",function(req,res){

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("pololololoo", salt, function(err, hash) {
            console.log(hash);
            res.send("Password hashed and logged");
        });
    });

});

app.get("/verify_data",function(req,res){
    let data = jwt.verify(req.cookies.token,"secret");
    console.log(data);
    res.send("check terminal");
});

app.get("/compare",function(req,res){
    bcrypt.compare("pololololoo", "$2b$10$YHu9txXWnBNYdungcxeBiOIBS9LadI4dsD4fMXiS1V.OiKN9QNU.m", function(err, result) {
        console.log(result);
        res.send("Password comparison logged");
    });
});

app.listen(3000);
