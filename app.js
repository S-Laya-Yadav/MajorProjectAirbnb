if(process.env.NODE_ENV  != "production"){
    require("dotenv").config();
}

// require("dotenv").config();
// console.log(process.env.SECRET);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsyc.js");
const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema }= require("./schema.js");
// const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


// const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";
const dbUrl =process.env.ATLASDB_URL;




async function main(){
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(dbUrl);
}
main()
.then(() =>{
    console.log("connect to DB");
})
.catch((err) =>{
    console.log(err);
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
// use ejs-locals for all ejs templates:
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// app.use(session({
//     store:MongoStore.create({
//         mongoUrl: dbUrl,
//         crypto:{
//                     secret: "mysupersecretcode",
//                 },
//                 touchAfter: 24 * 3600,
//     })
// }))

// const store = MongoStore.create({

//     mongoUrl: dbUrl,
//     crypto:{
//         secret: "mysupersecretcode",
//     },
//     touchAfter: 24 * 3600,
// })
const store= MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
    //   secret: "mysupersecretcode",
      secret: process.env.SECRET,
    },
    touchAfter:24*3600,
  });

store.on("error", () =>{
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave : false,
    saveUninitialized: true,
    cookie: {
        expiers: Date.now()*7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly: true,
    }
};

// app.get("/",(req, res) =>{
//     res.send("Hi, i am root");
// })


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    // console.log(success);
    next();
})

// //pass
// app.get("/demouser", async(req, res) =>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student"
//     });

//    let registeredUser =  await User.register(fakeUser, "helloworld");
//    res.send(registeredUser);
// })



app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// app.get("/testListing", async (req, res) =>{
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description: "By the beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"India",
//     });
// await sampleListing.save();
// console.log("sample was saved");
// res.send("successful testing");
// });

app.all("*", (req, res, next) =>{
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next)=>{
    let { statuscode = 500, message="something went wrong"} = err;
    res.status(statuscode).render("error.ejs",{err});
    // res.status(statuscode).send(message);
})

app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
})