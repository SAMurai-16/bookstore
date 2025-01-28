const Product = require("../models/productModel")
const asynchandler = require("express-async-handler")
const slugify = require("slugify")
const User = require("../models/userModel2");



const createProduct = asynchandler(async(req,res)=>{
  try{
    if (req.body.title){
        req.body.slug = slugify(req.body.title)
    }
    const newProduct  = await Product.create(req.body)
    res.json(newProduct);

  }
  catch(error){throw new Error(error)}
})

const updateProduct = asynchandler(async (req, res) => {
    const { id } = req.params; // Correctly extract the id as a string
    try {
        // If there's a title in the request body, create a slug for it
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        // Update the product using the _id field
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
        });

        // If no product was found with the given id, return a 404 error
        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        // Respond with the updated product
        res.json(updatedProduct);
    } catch (error) {
        // Handle errors by throwing an error
        throw new Error(error.message);
    }
});


const getaProduct = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
        const findProduct = await Product.findById(id);
        res.json(findProduct)

    } catch (error){
        throw new Error(error)
    }
})

const deleteProduct =  asynchandler(async (req, res) => {
    const { id } = req.params; // Correctly extract the id as a string
    try {

        // Update the product using the _id field
        const deleteProduct = await Product.findByIdAndDelete(id);


        // Respond with the updated product
        res.json(deleteProduct);
    } catch (error) {
        // Handle errors by throwing an error
        throw new Error(error.message);
    }
})


const getAllProduct  = asynchandler(async(req,res)=>{
    try{

        //filtering
        const queryObj = {...req.query}
        const excludeFields = ["page","sort","limit","fields"]
    
    excludeFields.forEach((el)=> delete queryObj[el])
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g  , (match)=>`$${match}`)
    let query = Product.find(JSON.parse(queryStr))

    //sorting
    if(req.query.sort){
        const  sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy)

    }
    else{
query = query.sort('-createdAt')
    }
    //limiting the fields
     if(req.query.fields){
        const  fields = req.query.fields.split(",").join(" ");
        query = query.select(fields)


     }
     else{
        query = query.select('-__v')
     }

     //pagination
     const page = req.query.page
     const limit  = req.query.limit
     const skip = (page - 1 )*limit
     console.log(page,limit,skip)
     query = query.skip(skip).limit(limit)
     if(req.query.page){
        const productCount = await Product.countDocuments()
        if(skip>= productCount) throw new Error("this page does not exist")
     }
    const product  =  await query;
    res.json(product)

    }
    catch(error){
        throw new Error(error)
    }
});


const addtowishlist = asynchandler(async(req,res)=>{
    const{_id} = req.user;
    console.log(_id);
    const {prodId} = req.body;
    try{
        const user = await User.findById(_id);
        const alreadyadded =  user.wishlist.find((id)=> id.toString()===prodId);
        if(alreadyadded){
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $pull: {wishlist: prodId},

                },
                {
                    new:true,
                }

            )
            res.json(user);
        } else{
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push:{wishlist:prodId},
                },
                {
                    new:true,
                }
            );
            res.json(user);
        }



    }
    catch(error)
    {
        throw new Error(error);
    }


});

const rating = asynchandler(async(req,res)=>{
    const {_id} = req.user;
    const{ star, prodId,comment} = req.body;
    try{
        const product = await Product.findById(prodId);
        let alreadyrated  = product.ratings.find((userId)=>userId.postedby.toString()===_id.toString());
        if(alreadyrated){
            const updaterating = await Product.updateOne(
                {
                    ratings:{$elemMatch: alreadyrated},
                },
                {
                    $set: {"ratings.$.star":star,"ratings.$.comment":comment},
                },
                {
                    new:true,
                }
            )
           

        } else  {
            const rateproduct  = await Product.findByIdAndUpdate(
                prodId,
                {
                    $push:{
                        ratings: {
                            star:star,
                            comment:comment,
                            postedby:_id,
                        },

                    }

                },
                {new:true}

            )
            
        }
        const getallratings = await Product.findById(prodId);
        let totalrating =  getallratings.ratings.length;
        let ratingsum  =  getallratings.ratings.map((item)=>item.star).reduce((prev,curr)=> prev+curr, 0 );
        let actualrating = Math.round(ratingsum/totalrating);
        let finalproduct = await Product.findByIdAndUpdate(
            prodId,
            {
                totalratings : actualrating,
            },
            {new:true}
        )
        res.json(finalproduct)




    }
    catch(error){
        throw new Error(error);

    }

})







module.exports={
    createProduct,
    getaProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addtowishlist,
    rating,
    

}