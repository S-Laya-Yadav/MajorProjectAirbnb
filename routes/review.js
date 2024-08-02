const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema, reviewSchema }= require("../schema.js"); 
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validatReview, isLoggedIn,isreviewAuthor } = require("../middleware.js");


// const validatReview = (req, res, next) =>{
//     let {error} = reviewSchema.validate(req.body);
   
//     if(error){
//         let errMsg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else{
//         next();
//     }
    
// }

const reviewController = require("../controllers/review.js");

//reviews
//post route
// router.post("/",
//     isLoggedIn,
//     validatReview, 
//     wrapAsync( async(req, res) =>{
//     console.log(req.params.id);
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
//     newReview.author = req.user._id;
//     console.log(newReview);
//     console.log(listing);
//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();
//     req.flash("success", "New review Created")

//     res.redirect(`/listings/${listing._id}`);

//     // console.log("new review saved");
//     // res.send("new review saved");

// }));
router.post("/",
    isLoggedIn,
    validatReview, 
    wrapAsync(reviewController.createReview ));

//Delete Review Route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isreviewAuthor,
    wrapAsync(reviewController.destroyReview)
)
// //Delete Review Route
// router.delete(
//     "/:reviewId",
//     isLoggedIn,
//     isreviewAuthor,
//     wrapAsync(async (req, res) =>{
//         let{id, reviewId} = req.params;

//         await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
//         await Review.findByIdAndDelete(reviewId);
//         req.flash("success", "Review Deleted")
//         res.redirect(`/listings/${id}`);
//     })
// )

module.exports = router; 
