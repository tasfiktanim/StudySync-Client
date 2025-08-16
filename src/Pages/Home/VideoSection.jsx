import React from "react";

const VideoSection = () => {
  const videos = [
    {
      id: 1,
      title: "What’s in the Online Batch This Year?",
      description:
        "Check out the highlights of our online batch for grades 6-10 and get an overview of the program.",
      youtubeLink: "https://www.youtube.com/embed/VIDEO_ID_1",
      thumbnail: "https://img.youtube.com/vi/VIDEO_ID_1/maxresdefault.jpg",
    },
    {
      id: 2,
      title: "Best Results of the Year",
      description:
        "See how students from grades 6-10 achieved top results in our online batch.",
      youtubeLink: "https://www.youtube.com/embed/VIDEO_ID_2",
      thumbnail: "https://img.youtube.com/vi/VIDEO_ID_2/maxresdefault.jpg",
    },
  ];

  return (
    <section className="w-full py-12 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center">
        What’s in Our Online Batch This Year?
      </h2>
      <p className="text-gray-600 mb-10 text-center max-w-2xl">
        A complete journey from beginner to top performance in our online classes.
      </p>

      {/* Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl px-4 sm:px-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={video.youtubeLink}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
              <p className="text-gray-600 text-sm">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-10">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
          Enroll in Our Class
        </button>
      </div>
    </section>
  );
};

export default VideoSection;
