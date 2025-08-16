import React from "react";

const DownloadAppSection = () => {
  return (
    <section className="w-full py-8 flex justify-center">
      <div className="max-w-4xl w-full bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] rounded-3xl shadow-2xl flex flex-col md:flex-row items-center md:items-start p-6 md:p-10 gap-6">

        {/* Text Section */}
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug">
            Download our mobile app <br className="hidden sm:block" />
            and start learning today!
          </h2>
          
          <p className="text-gray-200 mb-4 text-sm sm:text-base">
            Learn anytime, anywhere with our interactive mobile app.
          </p>

          <div className="flex justify-center md:justify-start gap-3 sm:gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Google Play" 
                className="h-10 sm:h-12"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="App Store" 
                className="h-10 sm:h-12"
              />
            </a>
          </div>
        </div>

        {/* Mobile Screenshot Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/2314395.jpg"
            alt="Mobile App Screenshot"
            className="w-40 sm:w-48 md:w-64 lg:w-72 rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
};

export default DownloadAppSection;
