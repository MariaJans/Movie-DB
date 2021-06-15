//creating a simple server
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("ok");
}
);
//creating simple API
app.get("/test",(req, res) => {
    res.send({
        status:200, 
        message:"ok"
    })
});

app.get("/time",(req, res) => {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    res.send({
        status:200,
        message: hour + ":" + minute,
    })
})
app.listen(3000);
