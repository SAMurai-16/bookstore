import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
const BlogCard = (props) => {
    const{data}=props


  return (
    <>
    {
        data?.map((item,index)=>{
            return(

                <div key={index} className='col-3'>
                <div className="blog-card">
                    <div className="blog-image">
                        <img src={item?.images[0]?.url ||"images/blog-1.jpg"}
                        className='img-fluid'
                         alt="blog" />
                    </div>
                    <div className="blog-content">
                        <p className='Date'>{moment(item?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                            <h5 className='title'> 
                               {item?.title}
                            </h5>
                            <p className='desc'>{item?.description}</p>
                            <Link to={`blog/${item?._id}`} className='button'>Read More</Link>
                        
                        </div>
                </div>
              
            </div>

            )

        })
    }
 
    </>
  )
}

export default BlogCard
