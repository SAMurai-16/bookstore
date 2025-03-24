const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

let bucket; // Global variable to store GridFSBucket

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(
            "mongodb+srv://user2000:ssbcc2005@cluster0.qdfdz.mongodb.net/bookstore",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        console.log("✅ Database Connected Successfully");

        mongoose.connection.once("open", () => {
            const db = mongoose.connection.db;

            if (!db) {
                console.error("❌ Database connection missing!");
                return;
            }

            bucket = new GridFSBucket(db, { bucketName: "uploads" });

            if (bucket) {
                console.log("✅ GridFS Initialized Successfully");
            } else {
                console.error("❌ GridFSBucket failed to initialize!");
            }
        });

    } catch (error) {
        console.error("❌ Database Connection Error:", error);
        throw error;
    }
};

const getGridFSBucket = () => {
    if (!bucket) {
        console.error("❌ GridFSBucket is NOT initialized!");
        throw new Error("GridFSBucket is not initialized yet!");
    }
    return bucket;
};

module.exports = { dbConnect, getGridFSBucket };
