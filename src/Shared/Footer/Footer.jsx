import React from 'react';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaTiktok,
    FaWhatsapp,
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 px-6 py-10 border-t">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo & App Links */}
                <div>
                    <h1 className="text-xl font-bold mb-3">
                        📚 StudySphere
                    </h1>
                    <p className="mb-3">Download Our Mobile App</p>
                    <div className="flex gap-3">
                        <a href="#">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Google Play"
                                className="h-10"
                            />
                        </a>
                        <a href="#">
                            <img
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="App Store"
                                className="h-10"
                            />
                        </a>
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h3 className="font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#">Career / Recruitment</a></li>
                        <li><a href="#">Join as a Teacher</a></li>
                        <li><a href="#">Join as an Affiliate</a></li>
                        <li><a href="#">Privacy policy</a></li>
                        <li><a href="#">Refund policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Others */}
                <div>
                    <h3 className="font-semibold mb-3">Others</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Book Store</a></li>
                        <li><a href="#">Free Notes & Guides</a></li>
                        <li><a href="#">Job Preparation Courses</a></li>
                        <li><a href="#">Verify Certificate</a></li>
                        <li><a href="#">Free Download</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold mb-3">Keep up with us at</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            Call Us: <span className="text-green-600 font-medium">12345</span> (9am–9pm)
                        </li>
                        <li>
                            WhatsApp: <a href="https://wa.me/8801000000000" className="text-green-600">+8801000000000</a> (Support Hours)
                        </li>
                        <li>
                            Outside Bangladesh: <span className="text-green-600">+8801000001234</span>
                        </li>
                        <li>
                            Email Us: <a href="mailto:help@example.com" className="text-green-600">help@studysphere.com</a>
                        </li>

                    </ul>
                    <div className="flex gap-3 mt-4">
                        <FaFacebookF className="text-xl" />
                        <FaInstagram className="text-xl" />
                        <FaLinkedinIn className="text-xl" />
                        <FaYoutube className="text-xl" />
                        <FaTiktok className="text-xl" />
                    </div>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="text-center text-sm mt-10 text-gray-500">
                2015 - 2025 Copyright © 📚 StudySphere. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
