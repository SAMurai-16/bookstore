import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getaBlog } from '../features/blog/blogSlice';
import moment from 'moment';

const SingleBlog = () => {
    const location = useLocation();
    const getBlogId = useMemo(() => location.pathname.split('/')[2], [location]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getaBlog(getBlogId));
    }, [dispatch, getBlogId]);

    const blogState = useSelector((state) => state.blog.singleblog);

    // Extract image URL safely
    const blogImage = blogState?.images?.[0]?.url ;

    return (
        <div className="single-blog-container py-5">
            <div className="blog-header" style={{
                width: '100%',
                height: '400px',
                background: `url(${blogImage}) center/cover no-repeat`
            }}></div>
            <div className="container-xxl mt-4 px-3">
                <h2 className="blog-title">{blogState?.title || "Blog Title"}</h2>
                <p className="blog-meta">Published on: {moment(blogState?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                <div className="blog-content">
                    <p>{blogState?.description || "No content available."}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;
