const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
//* Auth Controller
const urlController = require("../controllers/url.controller");

//* GET-> '/:shortUrl' to go to shortened URL (basically)
router.get("/:shortUrl", urlController.shortUrl);

router.use(auth);

//* POST-> '/shorten' to create a new shortened URL
router.post("/shorten", urlController.shortenUrl);

//* GET-> '/all' to get all of loggedIn user's shortened URLs
router.get("/user/all", urlController.getAllUrls);

module.exports = router;
