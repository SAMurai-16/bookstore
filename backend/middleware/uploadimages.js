const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises; // use promise-based API

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ".jpeg");
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadphoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 } // 2MB
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();

  console.log("FILES:", req.files);

  await Promise.all(
    req.files.map(async (file) => {
      const outputPath = `public/images/products/${file.filename}`;

      try {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(outputPath);

        // ✅ Delete original file safely
        await fs.unlink(file.path);
        console.log("Deleted original file:", file.path);
      } catch (err) {
        console.error("Error processing image:", file.filename, err);
      }
    })
  );

  next();
};

const blogImgResize = async(req,res,next)=>{
    if(!req.files) return next();
    await Promise.all(
        req.files.map(async (file)=>{
            await sharp(file.path)
            .resize(300,300)
            .toFormat('jpeg')
            .jpeg({quality:90})
            .toFile(`public/images/blogs/${file.filename}`)
            fs.unlinkSync(`public/images/blogs/${file.filename}`)

        }
    ))

    next();
}
module.exports = {uploadphoto, productImgResize , blogImgResize}