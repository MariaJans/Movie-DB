const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
let mongoose = require("mongoose");
let router = express.Router();
let moviesschema = mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, min: 1000, max: 9999, required: true },
    rating: { type: Number, default: 4 }
});

let MoviesModel = mongoose.model("Movies", moviesschema);
router.use("/", (req, res, next) => {
    next();
})
router.get("/read", (req, res) => {
    res.send({
        status: 200,
        data: movies,
    })
});

router.get("/read/by-date", (req, res) => {
    const sortbyyear = movies.slice().sort((a, b) => a.year - b.year)
    res.send({
        status: 200,
        data: sortbyyear,
    })
});
router.get("/read/by-rating", (req, res) => {
    const sortbyrating = movies.slice().sort((a, b) => b.rating - a.rating)
    res.send({
        status: 200,
        data: sortbyrating,
    })
});
router.get("/read/by-title", (req, res) => {
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

router.get("/read/id/:id(\\d+)", (req, res) => {
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

router.post("/add", (req, res) => {
    const title = req.query.title;
    const year = req.query.year;
    const rating = req.query.rating;
    
    let NewMovies = new MoviesModel({
        title: title,
        year: year,
        rating: rating,
    })
    NewMovies.save((error, NewMovies) => {
        if (error) {
            res.send(error.message)
        } else {
            res.status(200).send(NewMovies);
        }
    });



});

//Delete

router.delete("/delete/:id(\\d+)", (req, res) => {
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

router.put("/update/:id(\\d+)", (req, res) => {
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

module.exports = router;

