const multer = require("multer");
const path = require("path");
const fs = require("fs");



const pdfDir = path.join(__dirname, "../public/pdfs");

// Ensure the directory exists before storing files
if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true }); // Creates parent directories if needed
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/pdfs")); // Store PDFs in this folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

// Multer File Filter to Accept PDFs Only
const pdfFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
        console.log("hi");
        
    } else {
        cb({ message: "Only PDFs are allowed!" }, false);
    }
};

// Multer Upload Middleware
const uploadPDFmulter = multer({
    storage: storage,
    fileFilter: pdfFilter,
    limits: { fileSize: 100000000 } // 5MB limit
});

module.exports = {uploadPDFmulter};
