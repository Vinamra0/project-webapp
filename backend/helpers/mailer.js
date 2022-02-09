const mailer = async ({ email, name, reason, link }) => {
  const { CourierClient } = require("@trycourier/courier");
  const logger = require("./logger");

  const courier = CourierClient({
    authorizationToken: "pk_prod_26DY38GMJ1M5W9QVD17QEB21VBHR",
  });
  const recipientName = name || email.split("@")[0];
  const result = await courier.send({
    brand: "XC3XNXSPTV4XTAMPMBYH99KPKM9P",
    eventId: "B0RAW55S8ZME2SKD8YAJW62P6V4D",
    recipientId: "2eb6b357-4a5d-4078-a6ac-c2217cc7559b",
    profile: {
      email,
    },
    data: {
      NAME: recipientName,
      REASON: reason,
      LINK: link,
    },
    override: {},
  });
  if (!result.messageId) {
    return console.log("failed to send email");
  }

  logger({
    userId: "",
    message: `Email sent to ${recipientName} for ${reason} with email ${email}`,
    ip: 0,
  });
};
module.exports = mailer;
