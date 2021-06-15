//creating a simple server
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("ok");
}
);
//creating simple API
app.get("/test", (req, res) => {
    res.send({
        status: 200,
        message: "ok"
    })
});

app.get("/time", (req, res) => {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    res.send({
        status: 200,
        message: hour + ":" + minute,
    })
})
app.get("/hello/:id(\\d+)", (req, res) => {
    res.send({
        status: 200,
        message: "Hello " + req.params.id,
    })
})
app.get("/search", (req, res) => {
    const search = req.query.s;
    if (search) {
        res.send({
            status: 200,
            message: "ok",
            data: search,
        })
    } else {
        res.send({
            status: 500,
            error: true,
            message: "you have to provide a search",
        })
    }
})
app.listen(3000);
