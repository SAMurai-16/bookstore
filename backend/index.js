const express = require("express");
const { dbConnect } = require("./config/connect");
const authRoute = require("./routes/authRoute");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const {authMiddleware}  = require("./middleware/authMiddleware")
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken")
const PORT = process.env.PORT || 5000; // Use environment variable for PORT
const app = express();
const cookieParser = require("cookie-parser")
const productRoute = require("./routes/productRoute")
const blogRoute = require("./routes/blogroute")
const prodcategoryRoute = require("./routes/prodcategoryRoute")
const { GenerateToken } = require("./config/jwtToken");    
const blogCatRoute = require("./routes/blogCatRoute")
const brandRoute = require("./routes/brandRoute")
const couponRoute = require("./routes/couponRoute")
const uploadRoute = require("./routes/uploadRoute")
const uploadpdfRoute = require("./routes/uploadpdfRoute")

const cors = require("cors")
const morgan = require("morgan")

// Connect to the database
dbConnect();

// Middleware to parse JSON and URL-encoded bodies
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// Define your routes
app.use("/api/user", authRoute);
app.use("/api/product",productRoute)
app.use("/api/blog", blogRoute)
app.use("/api/prodcategory",prodcategoryRoute)
app.use("/api/blogcategory",blogCatRoute);
app.use("/api/brand",brandRoute)
app.use("/api/coupon",couponRoute)
app.use("/api/upload",uploadRoute)
app.use("/api/uploadpdf",uploadpdfRoute)
app.post("/api/refresh", (req, res) => {
    const refreshToken = req.cookies.RefreshToken;

    if (!refreshToken) return res.status(401).json("No refresh token provided");

    jwt.verify(refreshToken, process.env.secret, (err, decoded) => {
        if (err) return res.status(403).json("Invalid or expired refresh token");

        const newAccessToken = GenerateToken(decoded.id);
        res.json({ accessToken: newAccessToken });
    });
});


app.use(notFound);


// Test route (if needed)
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start the server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
