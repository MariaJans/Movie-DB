const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const verify = require("./verification");
let mongoose = require("mongoose");
const verification = require("./verification");
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
router.get("/read", verify, (req, res) => {
    MoviesModel.find((error, NewMovies) => {
        if (error) {
            res.send(error.message)
        } else {
            res.status(200).send(NewMovies);
        }
    });
});

router.get("/read/by-date", verify, (req, res) => {
    MoviesModel.find((error, NewMovies) => {
        if (error) {
            res.send(error.message)
        } else {
            res.status(200).send(NewMovies);
        }
    }).sort({ "year": 1 });
});

router.get("/read/by-rating", verify, (req, res) => {
    MoviesModel.find((error, NewMovies) => {
        if (error) {
            res.send(error.message)
        } else {
            res.status(200).send(NewMovies);
        }
    }).sort({ "rating": -1 });
});

router.get("/read/by-title", verify, (req, res) => {
    MoviesModel.find((error, NewMovies) => {
        if (error) {
            res.send(error.message)
        } else {
            res.status(200).send(NewMovies);
        }
    }).sort({ "title": 1 })
});



router.get("/read/id/:id", verify, (req, res) => {
    MoviesModel.findById(req.params.id, (error, NewMovies) => {
        if (error) {
            res.send(error.message)
        } else {
            res.status(200).send(NewMovies);
        }
    })
});



router.post("/add", verify, (req, res) => {
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



router.delete("/delete/:id", verify, (req, res) => {
    MoviesModel.findOneAndDelete({ _id: req.params.id }, (error, NewMovies) => {
        if (error) {
            res.send(error.message)
        } else {
            res.status(200).send(NewMovies);
        }
    })
});


router.put("/update/:id", verify, async (req, res) => {
    let title = req.query.title;
    let year = req.query.year;
    let rating = req.query.rating;
    try {
        const movie = await MoviesModel.findOne({ _id: req.params.id });
        if (title === undefined || title === "") {
            title = movie.title;
        } else {
            movie.title = title;
        }
        if (year === undefined || year === "" || !(/^\d{4}$/).test(year)) {
            year = movie.year;
        } else {
            movie.year = year;
        }
        if (rating === undefined || rating === "") {
            rating = movie.rating;
        } else {
            movie.rating = rating;
        }
        await movie.save();
        const movieslist = await MoviesModel.find();
        res.status(200).send(movieslist);
    } catch (err) {
        res.send(err)
    }
});

module.exports = router;

