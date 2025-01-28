const Blog = require("../models/blogModel");
const User = require("../models/userModel2");
const asynchandler  = require("express-async-handler");
const { loginUserCtrl } = require("./userCtrl");
const cloudinaryUploadImg = require("../utils/cloudinary")



const createblog = asynchandler(async(req,res)=>{
    try{
        const newBLog = await Blog.create(req.body);
        res.json({
            newBLog
        })        

    }
    catch(error){
        throw new Error(error);
    }


});

const updateblog  = asynchandler(async(req,res)=>{
    const  {id}  =req.params;
    try{
        const updateblog = await Blog.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updateblog);

    }
    catch(error){
        console.log("heelo");
        throw new Error(error);
    }
});


const getblog  = asynchandler(async(req,res)=>{
    const  {id}  =req.params;
    try{
        const getblog = await Blog.findById(id).populate("likes").populate("dislikes");
     await Blog.findByIdAndUpdate(
        id,
        {
            $inc : {NumViews: 1},

        },
        {new:true}

        );
        res.json(getblog);

    }
    catch(error){
        throw new Error("hey");
    }
});

const getallblogs  = asynchandler(async(req,res)=>{
    try{
        const getblogs = await Blog.find();
        res.json(getblogs);

    }
    catch(error){
        throw new Error(error);
    }


});

const deleteblog  = asynchandler(async(req,res)=>{
    const  {id}  =req.params;
    try{
        const deleteblog = await Blog.findByIdAndDelete(id);
        res.json(deleteblog);

    }
    catch(error){
        console.log("heelo");
        throw new Error(error);
    }
});

const likeblog  = asynchandler(async(req,res)=>{
    const { blogID } = req.body;
    console.log(blogID);
   
    const blog = await Blog.findById(blogID);

    const loginuserID = req?.user?._id;
    const isliked = blog?.isliked;
    const alreadydisliked  = blog?.dislikes?.find(
       (userId) => userId?.toString() === loginuserID?.toString()
    )
    if (alreadydisliked){
        const blog = await Blog.findByIdAndUpdate(
            blogID,
            {
                $pull:{dislikes: loginuserID},
                isdisliked:false,
            },
            {new:true}
        );
        res.json(blog);
    }
    if(isliked){
        const blog = await Blog.findByIdAndUpdate(
            blogID,
            {
               $pull:{likes:loginuserID},
               isliked:false,
            },
            {new:true}
        );
        res.json(blog);
    }
    else{
        const blog = await Blog.findByIdAndUpdate(
            blogID,
            {
                $push: { likes : loginuserID},
                isliked:true,

            },
            {new:true}
        );
        res.json(blog);
    }


});

const dislikeblog  = asynchandler(async(req,res)=>{
    const { blogID } = req.body;
    console.log(blogID);
   
    const blog = await Blog.findById(blogID);

    const loginuserID = req?.user?._id;
    const isdisliked = blog?.isdisliked;
    const alreadyliked  = blog?.likes?.find(
       (userId) => userId?.toString() === loginuserID?.toString()
    )
    if (alreadyliked){
        const blog = await Blog.findByIdAndUpdate(
            blogID,
            {
                $pull:{likes: loginuserID},
                isliked:false,
            },
            {new:true}
        );
        res.json(blog);
    }
    if(isdisliked){
        const blog = await Blog.findByIdAndUpdate(
            blogID,
            {
               $pull:{dislikes:loginuserID},
               isdisliked:false,
            },
            {new:true}
        );
        res.json(blog);
    }
    else{
        const blog = await Blog.findByIdAndUpdate(
            blogID,
            {
                $push: { dislikes : loginuserID},
                isdisliked:true,

            },
            {new:true}
        );
        res.json(blog);
    }


});

const uploadImages = asynchandler(async(req,res)=>{
    const{id} = req.params;
    try{
        const uploader  =  (path)=> cloudinaryUploadImg(path,"images");
        const urls = [];
        const files = req.files;
        for ( const file of files){
            const {path} = file;
            const newpath =  await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }
        const findblog = await Blog.findByIdAndUpdate(id,{images : urls.map((file)=>{
            return file;
        }),
    },{
        new:true
    }
 ) 
 res.json(findblog)

}
    catch(error){
        throw new Error(error);
    }
})





module.exports = { createblog,updateblog,getblog,getallblogs,deleteblog,likeblog,dislikeblog,uploadImages}
