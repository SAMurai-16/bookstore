// not found 
const notFound = (req,res,next) => {
    const error = new Error(`Not Foun : ${req.originalUrl}`
    );
    res.status(404);
    next(error);


};

// Error Handler 
const errorHandler = (err,req,res,next) => {
    const statuscode = res.statusCode== 200 ? 500 : res.Statucode;
    req.status(statuscode);
    res.json({
        message: err?.message,
        stack: err?.stack,
    });

 };

 module.exports = {errorHandler,notFound};