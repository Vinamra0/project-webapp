const cloudinary = require("./cloudinary");
const deleteImage = (imageUrl, imageUrlArray = []) => {
  if (imageUrlArray.length > 0) {
    let publicIdArray = [];
    imageUrlArray.map((image) => {
      let fileName = image.split("/synoarx/")[1];
      publicIdArray.push("synoarx/" + fileName.substr(0, fileName.length - 4));
    });
    if (publicIdArray.length > 0) {
      cloudinary.api.delete_resources(publicIdArray, function (error, result) {
        error && console.log(error);
      });
    }
  } else if (imageUrl) {
    let fileName = imageUrl.split("/synoarx/")[1];
    let publicId = "synoarx/" + fileName.substr(0, fileName.length - 4);
    cloudinary.uploader.destroy(publicId, function (error, result) {
      error && console.log(error);
    });
  }
};
module.exports = deleteImage;
