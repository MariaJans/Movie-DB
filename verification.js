module.exports = (req, res, next) =>{
    const logged = req.header ("logged");
    if(logged === "121212"){
        next();
    }else{
        res.send("user not logged in")
    }
}