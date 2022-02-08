const router = require("express").Router();
const addComment = require("./addComment");
const deleteComment = require("./deleteComment");
const updateReaction = require("./updateReaction");
const validation = require("../../../middlewares/validation");
const validationSchema = require("./@validationSchema");
const verifyToken = require("../../../middlewares/verifyToken");

router.post(
  "/",
  validation(validationSchema.addCommentValidation),
  verifyToken,
  addComment
);
router.post(
  "/update",
  validation(validationSchema.updateReactionValidation),
  verifyToken,
  updateReaction
);
router.delete(
  "/",
  validation(validationSchema.deleteReactionValidation),
  verifyToken,
  deleteComment
);
module.exports = router;
