const express = require("express");
const User = require("../../schema/userSchema");
const bodyParser = require("body-parser");
const Post = require("../../schema/postSchema");

const app = express();
const router = express.Router();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

router.get("/", async (req, res) => {
  console.log("window loaded")
  Post.find()
  .populate("postedBy").sort({"createdAt": -1})
  .then((result) => {
    res.status(200).send(result)
  })
});

router.post("/", async (req, res) => {
  console.log(req.body);
  if (!req.body.postarea) {
    res.status(400).send("not worked");
    return;
  }
  const postData = {
    content: req.body.postarea,
    postedBy: req.session.user
  };
  Post.create(postData)
  .then(async newPost => {
    // status 201 means created
    newPost = await User.populate(newPost, {path: "postedBy"})
    res.status(201).send(newPost)
  })
});

module.exports = router;
