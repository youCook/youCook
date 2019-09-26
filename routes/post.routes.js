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
      posts.sort((a, b) => Math.random() - 0.5);
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
      res.render("posts/show", { post, user: req.user });
    })
    .catch(error => next(error));
});

router.post("/post-edit/:id", checker.checkLogin, (req, res) => {
  // Post.findByIdAndUpdate(
  //   req.params.id,
  //   { $push: { comment: comment._id } },
  //   { new: true }
  // )
  //   .then(post => {
  //     res.redirect("back");
  //   })
  //   .catch(error => next(error));
});

router.get("/post-edit/:id", checker.checkLogin, (req, res) => {
  Post.findById(req.params.id).then(post => res.status(200).json(post));
});

router.post("/create", uploadCloud.single("picPath"), (req, res, next) => {
  const { content, postName } = req.body;
  const { url } = req.file;

  const newPost = new Post({
    content,
    creatorId: req.user._id,
    postName: postName,
    picPath: url,
    likes: 0
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

router.get("/all", (req, res, next) => {
  User.findById(req.user._id)
    .populate("ownPosts")
    .then(data => {
      res.json(data.ownPosts);
    })
    .catch(error => next(error));
});

router.post("/post-edit/update/:id/:postName/:content", (req, res, next) => {
  let postName = "",
    content = "";
  if (req.params.postName != "none") {
    postName = req.params.postName;
  }
  if (req.params.content != "none") {
    content = req.params.content;
  }
  const id = req.params.id;
  console.log("body es", req.body);

  Post.findByIdAndUpdate(
    id,
    { postName: postName, content: content },
    { new: true }
  ).then(updated => {
    User.findById(req.user._id)
      .populate("ownPosts")
      .then(data => {
        res.json(data.ownPosts);
      })
      .catch(error => next(error));
  });
});

router.get("/post-delete/:id", (req, res, next) => {
  Post.findByIdAndDelete(req.params.id).then(() => {
    User.findById(req.user._id)
      .populate("ownPosts")
      .then(data => {
        res.json(data.ownPosts);
      });
  });
});

router.get("/create", checker.checkLogin, (req, res, next) => {
  const user = req.user;
  res.render("posts/create", { user });
});

router.get("/post-like/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    res.json(post);
  });
});
router.get("/post-like-plus/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post.likers.indexOf(req.user._id) >= 0 || post.creatorId === req.user._id) {
      return res.json(post);
    }
    let newLike = post.likes + 1;
    Post.findByIdAndUpdate(
      req.params.id,
      { likes: newLike },
      { new: true }
    ).then(post => {
      Post.findByIdAndUpdate(
        req.params.id,
        { $push: { likers: req.user._id } },
        { new: true }
      ).then(post => {
        res.json(post);
      });
    });
  });
});
router.get("/index-top-ten", (req, res, next) => {
  Post.find()
  .then(posts=> {
    posts.sort((a,b)=> b.likes - a.likes);
    let top5 = posts.slice(0,5);
    console.log(top5);
    res.json(top5);
  });
})










module.exports = router;
