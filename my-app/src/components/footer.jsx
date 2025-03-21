import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsInstagram, BsGithub, BsYoutube } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      {/* Newsletter Signup */}
      <footer className='py-4 px-5'>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-md-5">
              <div className='footer-top-data d-flex gap-30 align-items-center text-white'>
                <img src="images/newsletter.png" alt="newsletter" />
                <h2>Subscribe for Book Updates</h2>
              </div>
            </div>
            <div className="col-md-7">
              <div className="input-group">
                <input type="text" className="form-control py-2" placeholder="Your Email Address" aria-label="Your Email Address" />
                <span className="input-group-text p-1">Subscribe</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Links Section */}
      <footer className='py-4 px-3'>
        <div className="container-xxl">
          <div className="row">
            
            {/* Contact Section */}
            <div className="col-md-4">
              <h4 className='text-white'>Contact Us</h4>
              <div className='footer-links d-flex flex-column'>
                <address className='text-white fs-6'>
                  Book Haven, 12th Street,<br />
                  New Delhi, India<br />
                  Pincode: 110001
                </address>
                <a href="tel:+91 9995678080" className='text-white mt-2'>+91 9995678080</a>
                <a href="mailto:support@bookhaven.com" className='text-white mt-2'>support@bookhaven.com</a>
                <div className='social-icons d-flex align-items-center gap-3 mt-3'>
                  <a className='text-white fs-4'><BsGithub /></a>
                  <a className='text-white fs-4'><BsInstagram /></a>
                  <a className='text-white fs-4'><BsLinkedin /></a>
                  <a className='text-white fs-4'><BsYoutube /></a>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="col-md-3">
              <h4 className='text-white'>Information</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className="text-white py-2">Privacy Policy</Link>
                <Link className="text-white py-2">Refund Policy</Link>
                <Link className="text-white py-2">Shipping Policy</Link>
                <Link className="text-white py-2">Terms & Conditions</Link>
                <Link className="text-white py-2">Blogs</Link>
              </div>
            </div>

            {/* Customer Service Section */}
            <div className="col-md-3">
              <h4 className='text-white'>Customer Service</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className="text-white py-2">Order Tracking</Link>
                <Link className="text-white py-2">FAQs</Link>
                <Link className="text-white py-2">Contact Support</Link>
                <Link className="text-white py-2">Gift Cards</Link>
              </div>
            </div>

            {/* Book Categories Section */}
            <div className="col-md-2">
              <h4 className='text-white'>Categories</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className="text-white py-2">Fiction</Link>
                <Link className="text-white py-2">Non-Fiction</Link>
                <Link className="text-white py-2">Children’s Books</Link>
                <Link className="text-white py-2">Bestsellers</Link>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Copyright Section */}
      <footer className='py-3'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className='text-center text-white mb-0'>
                &copy; {new Date().getFullYear()} Book Haven | Powered by SAMurai
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
