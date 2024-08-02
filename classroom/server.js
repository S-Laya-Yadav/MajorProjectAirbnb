const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({secret: "mysupersecretstring"}));


const sessionOptions ={
        secret: "mysuperseccretstring",
        resave: false,
        saveUninitialized: true,
    };

    app.use(session(sessionOptions));
    app.use(flash());

    app.use((req, res, next) =>{
        res.locals.successMsg = req.flash("success");
        res.locals.errorMsg = req.flash("error");
    })

    app.get("/register",(req, res) =>{
        let{name="anonymous"} = req.query;
        // console.log(req.session);
        req.session.name = name;
        
        if(name === "annonymous"){

            req.flash("error", "user not registered ")
        } else{
            req.flash("success", "user registered successfully");
        }
        res.redirect("/hello");
        // console.log(req.session.name);
        // res.send(name);
    });

    app.get("/hello", (req, res) =>{
        // console.log("success");

        res.locals.successMsg = req.flash("success");
        res.locals.errorMsg = req.flash("error");
        res.render("page.ejs", {name: req.session.name});
    });

// app.get ("/reqcount", (req, res) =>{

//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count =1;
//     }

//     res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test",(req, res) =>{
//     res.send("test successful");
// });






// const cookieParser= require("cookie-parser");
// app.use(cookieParser());

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res) =>{
//     res.cookie("made-in", "India", {signed: true});
//     res.send("signed cookie sent");
// });

// app.get("/verify", (req, res) =>{
//     // console.log(req.cookies);
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies", (req, res)=>{
//     res.cookie("greet", "hello");
//     res.cookie("made in ", "india");
//     res.send("sent you some cookies");
// });
// app.get("/greet", (req, res)=>{
//     let {name = "annonymous"} = req.cookies;
//     // console.dir(req.cookies);
//     res.send(`hi, ${name}`);

// });
// app.get("/", (req, res)=>{
//     // let {name = "annonymous"} = req.cookies;
//     console.dir(req.cookies);
//     res.send("Hi, I am root!");

// });

// app.use("/users", users);
// app.use("/posts", users);

app.listen(3000, () =>{
    console.log("sever is listening in 3000");
});