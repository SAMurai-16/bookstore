import React from 'react'
import { Link } from 'react-router-dom'
const BlogCard = () => {
  return (
    <div className='col-3'>
        <div className="blog-card">
            <div className="blog-image">
                <img src="images/blog-1.jpg"
                className='img-fluid'
                 alt="blog" />
            </div>
            <div className="blog-content">
                <p className='Date'>1 Dec, 2024</p>
                    <h5 className='title'> 
                        A beautiful day
                    </h5>
                    <p className='desc'>efeafavfr effwfj rjk fw rfwj fjwrjkv jw rfrjwf lj 3lf 3 f3l  rejfw  e</p>
                    <Link to="" className='button'>Read More</Link>
                
                </div>
        </div>
      
    </div>
  )
}

export default BlogCard
