const Schemas = require("../../../models/index");
module.exports = async (req, res) => {
  const type = req.body.type;
  const user = req.body.userId;
  const notice = req.body.noticeId;

  try {
    const reaction = await Schemas.Notice_Reaction.findOne({
      notice: notice,
      user: user,
      type: {
        $ne: "comment",
      },
    }).exec();
    if (!reaction) {
      const newReaction = Schemas.Notice_Reaction({
        type: type,
        comment: "",
        notice: notice,
        user: user,
      });

      await newReaction.save();
      return res.status(201).json({
        success: true,
        message: "Reaction added successfully",
      });
    }

    if (reaction.type === type) {
      const result = await Schemas.Notice_Reaction.deleteOne({
        notice: notice,
        user: user,
        type: type,
      }).exec();
      console.log(result);

      if (result.deletedCount == 1) {
        res.status(200).json({
          success: true,
          message: "Reaction deleted successfully!!",
        });
      }
    } else {
      reaction.type = type;
      await reaction.save();
      res.status(200).json({
        success: true,
        message: "Reaction updated successfully!!",
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
