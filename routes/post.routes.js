const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const uploadCloud = require("../configs/cloudinary.config");
const checker = require("../middlewares/secure.mid");

router.get("/", (req, res, next) => {
  Post.find()
    .populate("creatorId")
    .then(posts => {
      console.log(posts);
      res.render("index", { posts, user: req.user });
    })
    .catch(error => next(error));
});

router.get("/post-info/:id", (req, res, next) => {
  const id = req.params.id;
  Post.findById(id)
    .populate("creatorId")
    .populate("comment")
    .then(post => {
      return Comment.populate(post, {
        path: "comment.authorId",
        model: User
      });
    })
    .then(post => {
      console.log(post);
      res.render("posts/show", { post, user: req.user });
    })
    .catch(error => next(error));
});

router.post("/post-edit/:id", checker.checkLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    { $push: { comment: comment._id } },
    { new: true }
  )
    .then(post => {
      res.redirect("back");
    })
    .catch(error => next(error));
});
router.get("/post-edit/:id", checker.checkLogin, (req, res) => {
  Post.findById(req.params.id)
  .then(post=> {
    res.render("/post/edit", {post})
  })
});

router.post("/create", uploadCloud.single("picPath"), (req, res, next) => {
  const { content, postName } = req.body;
  const { url } = req.file;

  const newPost = new Post({
    content,
    creatorId: req.user._id,
    postName: postName,
    picPath: url
  });
  newPost
    .save()
    .then(post => {
      User.findByIdAndUpdate(
        req.user._id,
        { $push: { ownPosts: post._id } },
        { new: true }
      ).then(us => {
        res.redirect("/");
      });
    })
    .catch(error => next(error));
});

router.get("/create", checker.checkLogin, (req, res, next) => {
  const user = req.user;
  res.render("posts/create", { user });
});

module.exports = router;
