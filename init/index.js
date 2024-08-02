const  mongoose = require("mongoose");
const initData= require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";
async function main(){
    await mongoose.connect(MONGO_URL);
}
main()
.then(() =>{
    console.log("connect to DB");
})
.catch((err) =>{
    console.log(err);
});

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data.map((obj) => ({...obj, owner:"66a1418c19f9b7a9dc441b8c"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();