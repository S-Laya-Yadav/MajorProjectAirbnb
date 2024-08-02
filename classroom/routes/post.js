const express = require("express");
const router = express.Router();


//posts
//index 
router.get("/", (req, res)=>{
    res.send("Get for post");
});

//show
router.get("/:id", (req, res) =>{
    res.send("Get for posts id")
})

//post 
router.post("/",(req, res)=>{
    res.send("Post for post");
})

//Delete
router.delete("/:id", (req, res) =>{
    res.send("Delete for posts id");
})

module.exports = router;