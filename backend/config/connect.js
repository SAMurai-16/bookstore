const mongoose = require("mongoose");


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

        console.log("Database Connected Successfully!!");
        

       

    } catch (error) {
        console.error("❌ Database Connection Error:", error);
        throw error;
    }
};



module.exports = { dbConnect };
