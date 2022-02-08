const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Schemas = require("../../models/index");
const logger = require("../../helpers/logger");
module.exports = async (req, res) => {
  const teamId = req.body.teamId || "61f2df2099088e5c1c0cb5f3";
  const userId = req.user._id;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  try {
    //find all notices by this teamId and get a array of noticeId
    const result = await Schemas.Notice.aggregate([
      {
        $match: {
          team: new ObjectId(teamId),
        },
      },
      {
        $group: {
          _id: "notice",
          notices: {
            $push: "$_id",
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    if (result.length == 0) {
      return res.status(400).json({
        success: false,
        message: `Notice/s doesn't exist`,
      });
    } else {
      const noticeIdArray = result[0].notices;
      await deleteNoticeByTeamId(noticeIdArray);
      logger({
        userId: userId,
        message: `All Notices with teamId: ${teamId} deleted by user with userId: ${userId} `,
        ip,
      });
      res.status(200).json({
        success: true,
        message: "Notice/s deleted successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
const deleteNoticeByTeamId = async (noticeIdArray) => {
  try {
    //delete notice reactions
    await Schemas.Notice_Reaction.deleteMany({
      notice: { $in: noticeIdArray },
    });
    //delete notice/s
    await Schemas.Notice.deleteMany({
      _id: { $in: noticeIdArray },
    });
  } catch (error) {
    throw error;
  }
};
