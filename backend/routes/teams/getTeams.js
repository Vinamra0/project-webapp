const Schemas = require("../../models/index");

module.exports = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  page--;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const team = await Schemas.Team.find()
      .sort({ name: 1 })
      .skip(page * limit)
      .limit(limit)
      .exec();

    if (team.length == 0 || !team) {
      return res.status(400).json({
        success: false,
        message: "Team doesn't exist",
      });
    }

    res.status(200).json(team);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
