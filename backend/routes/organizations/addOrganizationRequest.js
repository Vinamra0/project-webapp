const Schemas = require("../../models/index");
const jwt = require("jsonwebtoken");
const mailer = require("../../helpers/mailer");
module.exports = async (req, res) => {
  const name = req.body.name;
  const adminName = req.body.adminName;
  const adminEmail = req.body.adminEmail;
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  try {
    //check if organization already exists in database
    const result = await Schemas.Organization.findOne({ email_format }).exec();
    if (result) {
      return res.status(400).json({
        success: false,
        message: "Organization Already Exists",
      });
    }
    //create a token with above details
    const approveToken = jwt.sign(
      { name, adminName, adminEmail, ip, reqType: "add" },
      process.env.APPROVE_TOKEN_SECRET,
      {
        expiresIn: process.env.APPROVE_TOKEN_EXPIRE_TIME,
      }
    );
    //create a link with token
    const approveLink = `${fullUrl}/token/${approveToken}`;
    //send link to admin's email
    await mailer({
      email: process.env.ADMIN_EMAIL,
      reason: `Add a new Organization to Database whose details are:-
      Organization Name: ${name}
      Requested By: ${adminName}
      Requester's Email: ${adminEmail}
      Request IP : ${ip}
      `,
      link: approveLink,
    });
    res.status(200).json({
      success: true,
      message:
        "Request to add Organization sent successfully. Email will be sent on Approval.",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
