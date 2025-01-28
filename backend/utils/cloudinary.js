const cloudinary = require("cloudinary")
cloudinary.config(
    {cloud_name : 'dyghgu5zk',
        api_key : '157331518116152',
        api_secret : 'bYlUDXpvbtjUYLp0RADVyOTCdl4',

    }
)

const cloudinaryUploadImg = async(filetoupload)=>{
    return new Promise((resolve)=>{
        cloudinary.uploader.upload(filetoupload,(result)=>{
            resolve({
                url: result.secure_url,
                imgId: result.public_id,
                  asset_id: result.asset_id
            },
        {
            resource_type:"auto",
        })
        })
    })
}

// Delete an image from Cloudinary
const cloudinaryDeleteImg = async (publicId) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        (result) => {
          if (result.result === "ok") {
            resolve("Image deleted successfully");
          } else {
            reject("Failed to delete image");
          }
        },
        {
          resource_type: "image",
        }
      );
    });
  };

module.exports = cloudinaryUploadImg, cloudinaryDeleteImg;