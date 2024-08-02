const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review= require("./review.js");
const { ref } = require("joi");

const listingSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
        // type:String,
        // default:"https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg",
        // set: (v) => 
        //     v ===""
        // ? "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg" 
        // : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    },
],
owner: {
    type: Schema.Types.ObjectId,
    ref:"User",
},

geometry: {
    type:{
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        require: true
    },

},


});



listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}})
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;