const express = require("express");
let mongoose = require("mongoose");
const { request, response } = require("express");
let router = express.Router();

let userschema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: "users" })

let UserModel = mongoose.model("Users", userschema);

router.use("/", (req, res, next) => {
    next();
});
router.post("/create", async (req, res) => {

    try {
        const user = new UserModel({
            username: req.query.username,
            password: hashpassword,
        });
        await user.save();
        const userlist = await UserModel.find();
        res.status(200).send(userlist);
    } catch (error) {
        res.send(error);
    }
})
router.get("/login", async (req, res) => {

    try {
        const user = await UserModel.findOne({ username: req.query.username });
        if (!user) {
            return res.status(404).send("user does not exist");
        }
        const password = req.query.password === user.password;
        if (!password) {
            return res.status(404).send("wrong credentials");
        }
        res.status(200).send({ message: "121212" })
    } 
    catch(err){
        res.send(err);
    } 
})


module.exports = router;