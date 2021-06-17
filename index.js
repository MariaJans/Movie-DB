const express = require("express");
const app = express();
const importmovies = require("./movies");
app.use(express.json());
app.use("/movie", importmovies);
let mongoose = require("mongoose");
mongoose.connect("mongodb+srv://MariaJans:123abc123@moviedb.2qvgn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

// gives you a messsage if it is connected
mongoose.connection.on("connected", () => {
    console.log("Connected to database")
})

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

//creating a simple server

app.get("/", (req, res) => {
    res.send("ok");
});

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

//Complicate the API

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

//Basics for CRUD

//app.post("/movies/create", (req, res) => {
// res.send("create movies")
//});
app.get("/movies/read", (req, res) => {
    res.send({
        status: 200,
        data: movies,
    })
});
app.put("/movies/update", (req, res) => {
    res.send("update movies")
});
app.delete("/movies/delete", (req, res) => {
    res.send("delete movies")
});

//Search

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

//Read one

app.get("/movies/read/id/:id(\\d+)", (req, res) => {
    if (!movies[req.params.id - 1]) {
        res.status(404);
        res.send({
            status: 404,
            error: true,
            message: "The movie " + req.params.id + " does not exist"
        })
    } else {
        res.send({
            status: 200,
            data: movies[req.params.id - 1],
        })
    }
});

//Create

app.post("/movies/add", (req, res) => {
    const title = req.query.title;
    const year = req.query.year;
    const rating = req.query.rating;
    console.log(title);
    console.log(year);
    console.log(rating);

    if (title === "" || year === "" || isNaN(year) || year.length != 4) {
        res.send({
            status: 403,
            error: true,
            message: "you cannot create a movie without providing a title and a year",
        })
    } else if (rating === "" || rating === undefined) {
        movies.push({ title: title, year: year, rating: 4 })
        res.send({
            status: 200,
            data: movies,
        })
    } else {
        movies.push({ title: title, year: year, rating: rating })
        res.send({
            status: 200,
            data: movies,
        })
    }
});

//Delete

app.delete("/movies/delete/:id(\\d+)", (req, res) => {
    if (!movies[req.params.id - 1]) {
        res.send({
            status: 404,
            error: true,
            message: "the movie " + req.params.id + " does not exist"
        })
    } else {
        movies.splice(req.params.id - 1, 1);
        res.send({
            status: 200,
            data: movies,
        })
    }
});

//Update

app.put("/movies/update/:id(\\d+)", (req, res) => {
    let title = req.query.title;
    let year = req.query.year;
    let rating = req.query.rating;
    if (movies[req.params.id - 1]) {

        if (title === undefined || title === "") {
            title = movies[req.params.id - 1].title;
        }
        if (year === undefined || year === "" || !(/^\d{4}$/).test(year)) {
            year = movies[req.params.id - 1].year;
        }
        if (rating === undefined || rating === "") {
            rating = movies[req.params.id - 1].rating;
        }
        movies[req.params.id - 1] = { title, year, rating };
        res.send({
            status: 200,
            data: movies,
        })
    } else {
        res.send({
            status: 500,
            error: true,
            message: "The movie " + req.params.id + " does not exist"
        })
    }
});
app.listen(3000);

