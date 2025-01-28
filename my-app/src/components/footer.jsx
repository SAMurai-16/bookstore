import React from 'react'
import { Link } from 'react-router-dom'
import { BsLinkedin,BsInstagram,BsGithub,BsYoutube } from 'react-icons/bs'

const Footer = () => {
  return (
    <>
    <footer className='py-4'>
        <div className="conatiner-xxl">
            <div className="row align-items-center">
                <div className="col-5">
                    <div className='footer-top-data d-flex gap-30 align-items-center text-white'>
                        <img src="images/newsletter.png" alt="newsletter mb-0" />
                        <h2>
                            Sign Up For Newsletter
                        </h2>

                    </div>
                </div>
                <div className="col-7">
                    <div className="input-group">
                        <input type="text" className="form-control py-2" placeholder="Your Email Adress" aria-label="Your Email Address" aria-describedby="basic-addon2"/>
                        <span className="input-group-text p-1" id="basic-addon2">
                        Subscribe
                     </span>

                    </div>
   

                </div>
            </div>
        </div>
    </footer>
    <footer className='py-4'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-4">
                     <h4 className='text-white'>
                        Contact Us
                    </h4> 
                    <div className='footer-links d-flex flex-column'>
                        <address className='text-white fs-6'>Hno : 1600 Near Chanchala bai College,
                            Jabalpur, MP<br/>
                            Pincode: 482002
                        </address>
                        <a href="tel: +91 8884569089" className='mt-4 d-block mb-3 text-white'>+91 8884569089</a>
                        <a href="mailto: goforsamyak.c@gmail.com" className=' d-block mb-3 text-white'>goforsamyak.c@gmail.com</a>
                        <div className='socail-icons d-flex align-items-center gap-30'>
                            <a className='text-white fs-4'>
                                <BsGithub/>
                            </a>
                            <a className='text-white fs-4'> 
                                <BsInstagram/>
                            </a>
                            <a className='text-white fs-4'>
                                <BsLinkedin/>
                            </a>
                            <a className='text-white fs-4'>
                                <BsYoutube/>
                            </a>
                        </div>
                    </div>                    


             </div>
                <div className="col-3">
                    <h4 className='text-white'>
                        Information
                    </h4>
                    <div className='footer-links d-flex flex-column'>
                        <Link className="text-white py-2 mb-1">Privacy Policy</Link>
                        <Link className="text-white py-2 mb-1">Refund Policy</Link>
                        <Link className="text-white py-2 mb-1">Shipping Policy</Link>
                        <Link className="text-white py-2 mb-1">Terms & Conditions</Link>
                        <Link className="text-white py-2 mb-1">Blogs</Link>
                    </div>
                </div>
                <div className="col-3">
                    <h4 className='text-white'>
                        Account
                    </h4>
                    <div className='footer-links d-flex flex-column'>
                        <Link className="text-white py-2 mb-1">About</Link>
                        <Link className="text-white py-2 mb-1">Faq</Link>
                        <Link className="text-white py-2 mb-1">Contact</Link>
                        <Link className="text-white py-2 mb-1">Size Chart</Link>
                    </div>
                </div>
                <div className="col-2">
                    <h4 className='text-white'>
                        Quick LInks
                    </h4>
                    <div className='footer-links d-flex flex-column'>
                        <Link className="text-white py-2 mb-1">Laptops</Link>
                        <Link className="text-white py-2 mb-1">Headphones</Link>
                        <Link className="text-white py-2 mb-1">Tablet</Link>
                        <Link className="text-white py-2 mb-1">Watches</Link>
                    </div>
                </div>
             </div>

        </div>
    </footer>
    <footer className='py-3'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <p className='text-center text-white mb-0' >
                        &copy; {new Date().getFullYear()}; Powered by SAMurai

                    </p>
            
                 </div>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer
