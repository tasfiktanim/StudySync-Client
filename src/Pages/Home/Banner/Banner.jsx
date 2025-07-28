import React from 'react';
import CourseSection from './CourseSection';
import { Link } from 'react-router';

const Banner = () => {
    return (
        <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-12 px-4 lg:px-24">
            <h1 className="text-3xl lg:text-5xl font-bold text-center mb-12">
                Start Your Learning Journey Here <span className="text-pink-500">✨</span>
            </h1>

            <div className="flex flex-col lg:flex-row justify-center gap-8">
                {/* Left Section */}
                <div className="bg-[#0f1b35] px-6 py-6 rounded-xl shadow-lg w-full lg:w-1/2 text-white">
                    <div className="mb-3">
                        <span className="bg-[#12294d] text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                            Online Courses
                        </span>
                    </div>

                    <h2 className="text-xl font-semibold mb-5 leading-snug">
                        Admission is open for all Online Batch 2025 courses!
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 mb-5">
                        <div className="flex flex-col items-center">
                            <div className="bg-white/10 h-32 w-full flex justify-center items-center rounded-xl">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/10773/10773917.png"
                                    className="w-14 h-14"
                                    alt="Class 6-8"
                                />
                            </div>
                            <p className="text-sm mt-3 text-center">Class 6, 7, 8</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="bg-white/10 h-32 w-full flex justify-center items-center rounded-xl">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/995/995016.png"
                                    className="w-14 h-14"
                                    alt="Class 9-10"
                                />
                            </div>
                            <p className="text-sm mt-3 text-center">Class 9, 10</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="bg-white/10 h-32 w-full flex justify-center items-center rounded-xl">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/10039/10039644.png"
                                    className="w-14 h-14"
                                    alt="HSC 25 26"
                                />
                            </div>
                            <p className="text-sm mt-3 text-center">HSC 2025, 2026</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="bg-white/10 h-32 w-full flex justify-center items-center rounded-xl">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/753/753345.png"
                                    className="w-14 h-14"
                                    alt="HSC 27"
                                />
                            </div>
                            <p className="text-sm mt-3 text-center">HSC 2027</p>
                        </div>
                    </div>

                    <Link to={`/dashboard/my-created-sessions`}
                        className="text-green-400 text-sm font-medium hover:underline transition duration-200"
                    >
                        Book Free Classes for HSC 26–27 →
                    </Link>
                </div>


                {/* Right Section */}
                <div className="bg-[#3b2f2f] p-6 rounded-lg shadow-lg w-full lg:w-1/2">
                    <div className="mb-4">
                        <span className="badge badge-warning text-black">Skill Courses</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-6">
                        Learn essential skills and become your best version!
                    </h2>
                    <div className="flex gap-4 overflow-x-auto">
                        <img
                            src="https://images.unsplash.com/photo-1616186627816-721eb442fd88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVkdWNhdGlvbmFsJTIwY291cnNlJTIwcG9zdGVyfGVufDB8fDB8fHwy"
                            className="w-24 h-32 rounded"
                            alt="Course 1"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1627135775457-9c001a0537bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVkdWNhdGlvbmFsJTIwY291cnNlJTIwcG9zdGVyfGVufDB8fDB8fHwy"
                            className="w-24 h-32 rounded"
                            alt="Course 2"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1612817988276-5d6fde01f361?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWR1Y2F0aW9uYWwlMjBjb3Vyc2UlMjBwb3N0ZXJ8ZW58MHx8MHx8fDI%3D"
                            className="w-24 h-32 rounded"
                            alt="Course 3"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1568137223715-939ee931710e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWR1Y2F0aW9uYWwlMjBjb3Vyc2UlMjBwb3N0ZXJ8ZW58MHx8MHx8fDI%3D"
                            className="w-24 h-32 rounded"
                            alt="Course 4"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1709888246039-9d852575e871?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWR1Y2F0aW9uYWwlMjBjb3Vyc2UlMjBwb3N0ZXJ8ZW58MHx8MHx8fDI%3D"
                            className="w-24 h-32 rounded"
                            alt="Course 5"
                        />
                    </div>

                    <Link to={`/dashboard/my-created-sessions`} className="text-teal-400 mt-6 block hover:underline">
                        Enroll in 30+ Free Courses →
                    </Link>
                </div>
            </div>
            <CourseSection></CourseSection>
        </div>
    );
};

export default Banner;
