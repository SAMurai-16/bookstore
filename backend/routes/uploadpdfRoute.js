const express = require("express");
const router = express.Router();
const multer = require("multer");

const { getGridFSBucket ,dbConnect} = require("../config/connect");


dbConnect().then((bucketInstance) => {
    bucket = bucketInstance;
});

// Multer setup for file uploads
const storage = multer.memoryStorage(); // Store in memory before uploading
const upload = multer({ storage });

// 📌 Upload PDF File
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        const bucket = getGridFSBucket(); // Ensure GridFS is initialized
        const uploadStream = bucket.openUploadStream(req.file.originalname);

        uploadStream.end(req.file.buffer);

        res.json({ fileId: uploadStream.id, filename: req.file.originalname });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "File upload failed!" });
    }
});

// 📌 Retrieve PDF File
router.get("/file/:filename", async (req, res) => {
    try {
        const bucket = getGridFSBucket(); // Ensure GridFS is initialized

        const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
        downloadStream.pipe(res);

    } catch (error) {
        console.error("File Retrieval Error:", error);
        res.status(500).json({ error: "Error retrieving file!" });
    }
});

module.exports = router;
