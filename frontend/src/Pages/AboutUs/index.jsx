import React from "react";

export const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen mt-12">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          About VidStream
        </h1>
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://source.unsplash.com/random/800x600"
                alt="VidStream"
                className="rounded-lg shadow-md mb-4"
              />
            </div>
            <div>
              <p className="text-gray-800 text-lg leading-relaxed mb-6">
                At VidStream, we are passionate about providing a platform where
                content creators can share their videos with the world, and
                viewers can discover a vast array of engaging content. Our
                mission is to empower creativity, foster connections, and
                facilitate the exchange of ideas through the power of video.
              </p>
              <p className="text-gray-800 text-lg leading-relaxed mb-6">
                With a user-friendly interface and robust features, VidStream
                offers a seamless experience for both creators and viewers.
                Whether you're an aspiring filmmaker, a vlogger, or simply
                someone with a story to tell, our platform allows you to upload,
                share, and promote your videos with ease.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 mt-8">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src="https://source.unsplash.com/random/400x300"
                  alt="Feature"
                  className="rounded-lg shadow-md mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Feature 1
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  efficitur nisl at eros facilisis, vel faucibus eros facilisis.
                </p>
              </div>
            </div>
            {/* Add more feature cards here */}
          </div>
        </div>
      </div>
    </div>
  );
};
