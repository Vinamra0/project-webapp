const router = require("express").Router();
const getPosts = require("./getPosts");
const getPostById = require("./getPostById");
const getPostsByUserId = require("./getPostsByUserId");
const addPost = require("./addPost");
const updatePost = require("./updatePost");
//const deletePost = require("./deletePostById");
const deletePostById = require("./deletePostById");
const deletePostsByUserId = require("./deletePostsByUserId");

//get post route
router.get("/", getPosts);
//get post by postid route
router.get("/:id", getPostById);
//get post by userid route
router.get("/user/:id", getPostsByUserId);

//add post route
router.post("/", addPost);

//update post route
router.post("/update", updatePost);

//delete post
router.delete("/:id", deletePostById);
//delete all post for user
router.delete("/delete/all", deletePostsByUserId);
module.exports = router;
