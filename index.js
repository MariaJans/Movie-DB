//creating a simple server
const express = require("express");
const app = express();
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

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
});
app.get("/hello/:id(\\d+)", (req, res) => {
    res.send({
        status: 200,
        message: "Hello " + req.params.id,
    })
});
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
});

app.get("/movies/create", (req, res) => {
    res.send("create movies")
});
app.get("/movies/read", (req, res) => {
    res.send({
        status: 200,
        data: movies,
    })
});
app.get("/movies/update", (req, res) => {
    res.send("update movies")
});
app.get("/movies/delete", (req, res) => {
    res.send("delete movies")
});
app.get("/movies/read/by-date", (req, res) => {
    const sortbyyear = movies.slice().sort((a, b) => a.year - b.year)
    res.send({
        status: 200,
        data: sortbyyear,
    })
});
app.get("/movies/read/by-rating", (req, res) => {
    const sortbyrating = movies.slice().sort((a, b) => b.rating - a.rating)
    res.send({
        status: 200,
        data: sortbyrating,
    })
});
app.get("/movies/read/by-title", (req, res) => {
    const sortbytitle = movies.slice().sort((a, b) => {
        if (a.title < b.title)
            return -1;
        if (a.title > b.title)
            return 1;
        return 0;
    });
    res.send({
        status: 200,
        data: sortbytitle,
    })
});
app.listen(3000);

