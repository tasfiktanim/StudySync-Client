import React from "react";

const DownloadAppSection = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] flex justify-center items-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-20">
        
        {/* Text Section */}
        <div className="text-center md:text-left md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 leading-snug">
            Download our mobile app and start learning from today.
          </h2>
          
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-12 md:h-14" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-12 md:h-14" />
            </a>
          </div>
        </div>

        {/* Mobile Screenshot Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/2314395.jpg"
            alt="Mobile App Screenshot"
            className="w-64 md:w-80 lg:w-96 rounded-xl shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
};

export default DownloadAppSection;
