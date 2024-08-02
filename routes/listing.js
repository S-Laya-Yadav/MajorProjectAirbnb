const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validatListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");

const multer  = require('multer')

const {storage} = require("../cloudConfig.js")

// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage })

router.route("/")
.get( wrapAsync(listingController.index))
.post( 
    isLoggedIn, 
    // validatListing,
    upload.single('listing[image]'),
    wrapAsync(listingController.createListing )
);
// .post(upload.single('listing[image]'),(req, res)=>{
// .post(,(req, res)=>{
//     res.send(req.file);
// })

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
    isLoggedIn, 
    isOwner,
    upload.single('listing[image]'),
    validatListing,
    wrapAsync(listingController.updateListing))
.delete(
        isLoggedIn,
        isOwner, 
        wrapAsync(listingController.destroyListing));





//Edit route
router.get("/:id/edit",
    isLoggedIn, 
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router; 




// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsyc.js");
// // const ExpressError = require("../utils/ExpressError.js");
// const Listing = require("../models/listing.js");
// // const { listingSchema }= require("../schema.js");
// const {isLoggedIn, isOwner, validatListing} = require("../middleware.js");

// const listingController = require("../controllers/listing.js");
// const listingController = require("../controllers/listing.js");

// // const validatListing = (req, res, next) =>{
// //     let {error} = listingSchema.validate(req.body);
   
// //     if(error){
// //         let errMsg = error.details.map((el)=>el.message).join(",");
// //         throw new ExpressError(400, errMsg);
// //     } else{
// //         next();
// //     }
// // }  




// //index route
// router.get("/", wrapAsync(listingController.index));
// // router.get("/", wrapAsync(async (req, res) =>{
// //     const allListings = await Listing.find({});
// //     // console.log(allListings);
// //     res.render("listings/index.ejs", {allListings});
// // }));

// //new route
// router.get("/new", isLoggedIn, listingController.renderNewForm);
// // //new route
// // router.get("/new", isLoggedIn, (req, res) =>{
// //     // console.log(req.user);
    
// //     res.render("listings/new.ejs");
// // })

// //show route
// router.get("/:id", wrapAsync(listingController.showListing));
// // //show route
// // router.get("/:id", wrapAsync(async(req, res)=>{
// //     let { id } = req.params;
// //     const listing = await Listing.findById(id).
// //     populate({
// //         path: "reviews",
// //         populate:{
// //             path:"author",
// //         },

// //     }).
// //     populate("owner");
// //     if(!listing){
// //         req.flash("error", "Listing you requested does not exist");
// //         res.redirect("/listings");
// //     }
// //     console.log(listing);
// //     res.render("listings/show.ejs", {listing});
// // }));


// //create route
// router.post("/", 
//     isLoggedIn, 
//     validatListing,
//     wrapAsync(listingController.createListing )
// );
// // //create route
// // router.post("/", 
// //     isLoggedIn, 
// //     validatListing,
// //     wrapAsync(async (req, res)=> {
       
// // const  newListing = new Listing(req.body.listing);

// // newListing.owner = req.user._id;

// // await newListing.save();
// // req.flash("success", "New Listing Created");
// // res.redirect("/listings");
// // })
// // );

// //Edit route
// router.get("/:id/edit",
//     isLoggedIn, 
//     isOwner,
//     wrapAsync(listingController.renderEditForm));
// // //Edit route
// // router.get("/:id/edit",
// //     isLoggedIn, 
// //     isOwner,
// //     wrapAsync(async (req, res) =>{
// //     let { id } = req.params;
// //     const listing = await Listing.findById(id);
// //     if(!listing){
// //         req.flash("error", "Listing you requested does not exist");
// //         res.redirect("/listings");
// //     }
// //     res.render("listings/edit.ejs", {listing});
// // }));

// // update Route

// router.put("/:id",
//     isLoggedIn, 
//     isOwner,
//     validatListing,
//     wrapAsync(listingController.updateListing));

// // // update Route

// // router.put("/:id",
// //     isLoggedIn, 
// //     isOwner,
// //     validatListing,
// //     wrapAsync(async (req, res) =>{
// //         let { id } = req.params;
// //     await  Listing.findByIdAndUpdate(id, {...req.body.listing});
// //     req.flash("success", "Listing Updated")
// //     return res.redirect(`/listings/${id}`);
// // }));

// // Delete route
// router.delete("/:id", 
//     isLoggedIn,
//     isOwner, 
//     wrapAsync(listingController.destroyListing));
// // // Delete route
// // router.delete("/:id", 
// //     isLoggedIn,
// //     isOwner, 
// //     wrapAsync(async (req,res)=>{
// //     let { id } = req.params;
// //     let deleteListing = await Listing.findByIdAndDelete(id);
// //     console.log(deleteListing);
// //     req.flash("success", "Listing Deleted!")
// //     res.redirect("/listings");
// // }));


// module.exports = router; 