const express = require("express");
const router = express.Router();

const getIndexPage = (req, res) => {
  res.render("index", {
    title: "Arc's Genres API Tutorial",
    message: "Genres API",
    routes: [
      {
        name: "auth",
        path: "/api/auth",
      },
      {
        name: "customers",
        path: "/api/customers",
      },
      {
        name: "genres",
        path: "/api/genres",
      },
      {
        name: "home",
        path: "/api/home",
      },
      {
        name: "movies",
        path: "/api/movies",
      },
      {
        name: "rentals",
        path: "/api/rentals",
      },
      {
        name: "users",
        path: "/api/users",
      },
    ],
  });
};

router.get("/", getIndexPage);

module.exports = router;
