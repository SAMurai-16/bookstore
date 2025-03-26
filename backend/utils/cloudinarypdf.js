
const cloudinary = require("cloudinary")
cloudinary.config(
    {cloud_name : 'dyghgu5zk',
        api_key : '285145283688461',
        api_secret : 'Ouulz_1YoOTJCvQs_lEdHubWIMM',

    }
)

const cloudinaryUploadFile = async(filetoupload)=>{
    return new Promise((resolve)=>{
        cloudinary.uploader.upload(filetoupload,(result)=>{
            resolve({
                url: result.secure_url,
                imgId: result.public_id,
                  asset_id: result.asset_id
            },
        {
            resource_type:"raw",
        })
        })
    })
}


const cloudinarydeletePDF =async (req, res) => {
  const { id } = req.params;
  try {
      await cloudinary.uploader.destroy(id, { resource_type: "raw" });
      res.json({ message: "PDF Deleted Successfully" });
  } catch (error) {
      throw new Error(error);
  }
};

module.exports =cloudinaryUploadFile,cloudinarydeletePDF;