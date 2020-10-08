const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/exercise", (req, res) => {
  res.render("exercise");
});

router.get("/stats", (req, res) => {
  res.render("stats");
});

module.exports = router;