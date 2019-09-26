const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const uploadCloud = require("../configs/cloudinary.config");
const checker = require("../middlewares/secure.mid");
const axios = require("axios");

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

router.post("/post-info/:id/edit", checker.checkLogin, (req, res) => {
  Comment.create({ content: req.body.content, authorId: req.user._id })
    .then(comment => {
      Post.findByIdAndUpdate(
        req.params.id,
        { $push: { comment: comment._id } },
        { new: true }
      )
        .then(post => {
          res.redirect("back");
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
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
    if (
      post.likers.indexOf(req.user._id) >= 0 ||
      post.creatorId === req.user._id
    ) {
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
  Post.find().then(posts => {
    posts.sort((a, b) => b.likes - a.likes);
    let top5 = posts.slice(0, 5);
    res.json(top5);
  });

})

router.get("/add-bookmark/:id", (req, res, next) => {
  if(req.user.bookmarks.indexOf(req.params.id)>=0) {
    return;
  }
  User.findByIdAndUpdate(req.user._id, { $push: { bookmarks: req.params.id } },{ new: true })
  .then((user) => {

    res.json(user.bookmarks.length);
  })
})
router.get("/rem-bookmark/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { $pull: { bookmarks: req.params.id } },{ new: true })
  .then((user) => {

    res.json(user.bookmarks.length);
  })
})


router.get("/show-bookmarks", (req, res, next) => {
  let recipesArr=[];
  const promisesArray = [] 
  req.user.bookmarks.forEach(bookmark => {
    promisesArray.push(axios.get(`https://api.spoonacular.com/recipes/${bookmark}/information?apiKey=${process.env.API_KEY}`))
  })
  Promise.all(promisesArray)
  .then(values => {
    values.forEach(recipe => {
      recipesArr.push(recipe.data);
    })
    res.render("posts/singlerecipe", {recipeFinal: recipesArr})
  })    
});


router.get("/get-bookmark/:id", (req, res, next) => {

    let response = req.user.bookmarks.indexOf(req.params.id)>=0;
    console.log(response, req.user.bookmarks, "%%%%%%%%%%%%%%%%%%")
    res.json(response)

})


router.get("/show-recipe/:id", (req, res, next) => {
  axios
    .get(
      `https://api.spoonacular.com/recipes/search?query=${req.params.id}&apiKey=${process.env.API_KEY}`
    )
    .then(response => {
      const {data} = response
      // console.log(data.results[0].id);
      axios.get(`https://api.spoonacular.com/recipes/${data.results[0].id}/information?apiKey=${process.env.API_KEY}`)
      .then(recipe => {
        // const {data} = recipe
        // console.log(recipe)
        // let recipeFinal = recipe.data
        res.render("posts/singlerecipe", {recipeFinal : [recipe.data]})
      })
      .catch(e=> next(e))
    }).catch(e=> next(e))
});
// router.get("/show-mybookmarks", (req, res, next) => {
//   axios
//     .get(
//       `https://api.spoonacular.com/recipes/search?query=${req.params.id}&apiKey=${process.env.API_KEY}`
//     )
//     .then(response => {
//       const {data} = response
//       // console.log(data.results[0].id);
//       axios.get(`https://api.spoonacular.com/recipes/${data.results[0].id}/information?apiKey=${process.env.API_KEY}`)
//       .then(recipe => {
//         // const {data} = recipe
//         // console.log(recipe)
//         // let recipeFinal = recipe.data
//         res.render("posts/singlerecipe", {recipeFinal : [recipe.data]})
//       })
//       .catch(e=> next(e))
//     }).catch(e=> next(e))
// });








module.exports = router;
