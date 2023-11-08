const URL = require("../models/Url.model");
const User = require("../models/User.model");

exports.shortenUrl = async (req, res, next) => {
  try {
    const { originalUrl, customName } = req.body;
    const userId = req.userId;

    // Check if the custom name is available
    if (customName) {
      const existingUrl = await URL.findOne({ shortUrl: customName });
      if (existingUrl) {
        return res
          .status(400)
          .json({ message: "Custom name is already taken" });
      }
    }
    const expirationDays = 1;
    const expiresAt = new Date(
      Date.now() + expirationDays * 24 * 60 * 60 * 1000
    );

    const url = new URL({
      originalUrl,
      shortUrl: customName || generateShortUrl(),
      expiresAt,
      userId,
    });

    await url.save();

    // Update the user's URLs
    const user = await User.findById(userId);
    user.urls.push(url);
    await user.save();

    res.status(201).json({ message: "URL succesfully shortenend", url });
  } catch (err) {
    return res.status(500).json({ message: "URL shortening failed" });
  }
};

// Redirect to the original URL
exports.shortUrl = async (req, res, next) => {
  const { shortUrl } = req.params;

  const url = await URL.findOne({ shortUrl });

  if (!url) {
    return res.status(404).json({ message: "Short URL not found" });
  }

  if (url.expiresAt && new Date() > url.expiresAt) {
    return res.status(410).json({ message: "Short URL has expired" });
  }

  res.redirect(url.originalUrl);
};

// Get all URLs for the authenticated user
exports.getAllUrls = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId).populate("urls");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res
    .status(200)
    .json({ message: "URLs of user found successfully", urls: user.urls });
};

function generateShortUrl() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 6;
  let shortUrl = "";

  for (let i = 0; i < length; i++) {
    shortUrl += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return shortUrl;
}
