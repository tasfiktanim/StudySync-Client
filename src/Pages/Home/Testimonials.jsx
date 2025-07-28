import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
    {
        quote:
            "I never had time to attend physical classes, so I chose the online course. The lessons are very well-structured and easy to follow. Practicing daily has made a big difference.",
        name: "Zakaria Islam",
        role: "Entrepreneur, New York",
    },
    {
        quote:
            "I was skeptical about learning online, but this platform exceeded my expectations. It provided all the resources I needed, including live support and practice materials.",
        name: "Hasibur Rahman",
        role: "Online Business Owner, London",
    },
    {
        quote:
            "After joining the online batch from school, my English improved a lot. I watched over 80 classes, and the live charts and leaderboard features kept me motivated.",
        name: "Mushfik Jaman",
        role: "Class 8, Hillview High School, Toronto",
    },
    {
        quote:
            "The course content is top-notch and covers everything I need to improve my English. I love how flexible the schedule is, which fits perfectly with my job.",
        name: "Aisha Noor",
        role: "Marketing Executive, Dubai",
    },
    {
        quote:
            "From grammar to speaking, this course has helped me at every step. The interactive practice tests and feedback sessions are very effective to gather knowledge.",
        name: "Rahim Uddin",
        role: "College Student, Dhaka",
    },
    {
        quote:
            "The platform is easy to use, and the instructors are very supportive. I’ve gained so much confidence in my English speaking skills since joining.",
        name: "Emily Chen",
        role: "High School Student, Singapore",
    },
];

const Testimonials = () => {
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="py-16 bg-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
                Why do students and parents choose us first?
            </h2>

            <div className="max-w-6xl mx-auto px-4">
                <Slider {...settings}>
                    {testimonials.map((t, index) => (
                        <div key={index} className="px-3 h-full">
                            <div className="flex flex-col justify-between h-full bg-white border border-gray-200 rounded-xl shadow-md p-6 text-left">
                                <div>
                                    <div className="text-red-400 text-3xl leading-none mb-3">“</div>
                                    <p className="text-gray-700 text-sm mb-4">{t.quote}</p>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{t.name}</div>
                                    <div className="text-sm text-gray-500">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

            </div>
        </div>
    );
};

export default Testimonials;
