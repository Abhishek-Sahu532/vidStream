import React from "react";
import aboutUsHeading from "../../assets/Images/aboutUs_heading.jpg";

export const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white py-8 shadow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800">
            About VidStream
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to VidStream
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At VidStream, our mission is to empower creators and bring
                joy to audiences around the globe. We are a vibrant community
                that celebrates creativity, diversity, and the power of visual
                storytelling.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-lg shadow"
                >
                  <source
                    src="https://assets.codepen.io/3364143/7btrrd.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                VidStream was born out of a simple idea: to provide a
                platform where anyone can share their unique perspectives and
                passions through video. What started as a humble endeavor has
                grown into a global phenomenon, connecting millions of creators
                and viewers from every corner of the world.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that everyone has a story worth sharing, and we're
                committed to providing the tools and support to help you tell
                yours. From amateur filmmakers to seasoned professionals, our
                platform is a canvas for your creativity.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Hero"
                  className="w-full rounded-lg shadow "
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">Our Journey</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Empowering Creators Section */}
        <section className="mb-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Empowering Creators
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                At VidStream, we understand that great content starts with
                empowered creators. That's why we've built a suite of powerful
                tools to help you produce, edit, and share your videos with
                ease. Our intuitive interface and robust features ensure that
                your creative vision shines through.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                But our commitment to creators goes beyond just technology. We
                foster a supportive community where you can connect with
                like-minded individuals, collaborate on projects, and receive
                feedback to hone your craft.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src="https://plus.unsplash.com/premium_photo-1667520399367-8c2eddde0acc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Creator"
                  className="w-full rounded-lg shadow"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Join Our Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engaging Audiences Section */}
        <section className="mb-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Engaging Audiences
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                We know that great content deserves an engaged audience, and
                that's why we've designed VidStream to be a truly
                interactive experience. Our platform encourages viewers to
                connect, comment, and share their thoughts on the videos they
                love.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With features like custom playlists, personalized
                recommendations, and seamless integration across devices, we
                make it easy for you to discover, enjoy, and share the content
                that speaks to you.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://plus.unsplash.com/premium_photo-1667520399367-8c2eddde0acc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Audience"
                className="w-full rounded-lg shadow"
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Join the Movement
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Whether you're a creator, a viewer, or both, VidStream is your
            destination for unforgettable video experiences. Join our vibrant
            community today and be part of the movement that's reshaping how the
            world shares and connects.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign Up Now
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <p className="text-white text-center">
            &copy; VidStream {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};
