// import React from "react";

// const ArtisansPage = () => {
//   const artisans = [
//     {
//       id: 1,
//       name: "John Okafor",
//       skill: "Carpenter",
//       location: "Lagos, Nigeria",
//       bio: "Expert in custom furniture and woodwork with 10+ years of experience.",
//       image: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//     {
//       id: 2,
//       name: "Grace Adeniyi",
//       skill: "Tailor",
//       location: "Abuja, Nigeria",
//       bio: "Specialist in bespoke tailoring, wedding dresses, and alterations.",
//       image: "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//     {
//       id: 3,
//       name: "Samuel Eze",
//       skill: "Electrician",
//       location: "Port Harcourt, Rivers",
//       bio: "Certified electrician handling home and industrial electrical projects.",
//       image: "https://randomuser.me/api/portraits/men/51.jpg",
//     },
//     {
//       id: 4,
//       name: "Mary Chukwu",
//       skill: "Caterer",
//       location: "Enugu, Nigeria",
//       bio: "Passionate about creating African and continental dishes for events.",
//       image: "https://randomuser.me/api/portraits/women/68.jpg",
//     },
//     {
//       id: 5,
//       name: "Ahmed Musa",
//       skill: "Plumber",
//       location: "Kano, Nigeria",
//       bio: "Reliable plumber for home, office, and industrial piping solutions.",
//       image: "https://randomuser.me/api/portraits/men/77.jpg",
//     },
//   ];

//   return (
//     <div className="px-4 py-10 mx-auto max-w-7xl">
//       <h1 className="mb-8 text-3xl font-bold text-center">
//         Meet Our Artisans & Craftsmen
//       </h1>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {artisans.map((artisan) => (
//           <div
//             key={artisan.id}
//             className="overflow-hidden transition bg-white shadow-md rounded-2xl hover:shadow-xl"
//           >
//             <img
//               src={artisan.image}
//               alt={artisan.name}
//               className="object-cover w-full h-56"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold">{artisan.name}</h2>
//               <p className="font-medium text-blue-600">{artisan.skill}</p>
//               <p className="text-sm text-gray-500">{artisan.location}</p>
//               <p className="mt-2 text-sm text-gray-700">{artisan.bio}</p>
//               <button className="w-full py-2 mt-4 text-white transition bg-green-600 rounded-lg hover:bg-green-700">
//                 Contact
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ArtisansPage;

export default function HomePage() {
  return (
    <div className="mt-32 font-sans text-gray-900">
      {/* Hero Section */}
      <section className="grid items-center gap-8 px-6 py-20 mx-auto md:grid-cols-2 max-w-7xl">
        <div>
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            The Smart Way to <span className="text-indigo-600">Find Homes</span>
            , Hire <span className="text-green-600">Artisans</span> & Book{" "}
            <span className="text-blue-600">Technicians</span>
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Access verified listings and skilled professionals all in one
            platform. Fast, reliable, and convenient.
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <button className="px-8 py-4 font-semibold text-white transition bg-indigo-600 rounded-full hover:bg-indigo-700">
              Get Started
            </button>
            <button className="px-8 py-4 font-semibold text-indigo-600 transition border border-indigo-600 rounded-full hover:bg-indigo-50">
              Learn More
            </button>
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1600585154154-5a64a0c438b9"
            alt="Real Estate"
            className="shadow-lg rounded-2xl"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold">What We Offer</h2>
          <p className="mt-2 text-gray-600">
            Quick access to real estate, artisans, and technicians.
          </p>
        </div>
        <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
          <div className="p-8 transition bg-white shadow-md rounded-xl hover:shadow-xl">
            <h3 className="mb-3 text-xl font-bold text-blue-600">
              Real Estate
            </h3>
            <p className="mb-6 text-gray-600">
              Find your next home with verified listings and trusted agents.
            </p>
            <button className="px-6 py-3 text-white transition bg-blue-600 rounded-full hover:bg-blue-700">
              View Listings
            </button>
          </div>
          <div className="p-8 transition bg-white shadow-md rounded-xl hover:shadow-xl">
            <h3 className="mb-3 text-xl font-bold text-green-600">Artisans</h3>
            <p className="mb-6 text-gray-600">
              Get reliable artisans for carpentry, tailoring, and more.
            </p>
            <button className="px-6 py-3 text-white transition bg-green-600 rounded-full hover:bg-green-700">
              Hire Artisan
            </button>
          </div>
          <div className="p-8 transition bg-white shadow-md rounded-xl hover:shadow-xl">
            <h3 className="mb-3 text-xl font-bold text-indigo-600">
              Technicians
            </h3>
            <p className="mb-6 text-gray-600">
              Certified technicians for plumbing, electricals, and repairs.
            </p>
            <button className="px-6 py-3 text-white transition bg-indigo-600 rounded-full hover:bg-indigo-700">
              Book Technician
            </button>
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="grid items-center gap-10 px-6 py-20 mx-auto md:grid-cols-2 max-w-7xl">
        <div>
          <img
            src="https://images.unsplash.com/photo-1581090465086-cc88c21d59a6"
            alt="Services"
            className="shadow-lg rounded-2xl"
          />
        </div>
        <div>
          <h2 className="mb-4 text-3xl font-bold">
            Why Choose <span className="text-indigo-600">Us?</span>
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            We bring together the best professionals and verified real estate
            deals into one easy-to-use marketplace. Trusted by hundreds of users
            daily.
          </p>
          <button className="px-8 py-4 font-semibold text-white transition bg-indigo-600 rounded-full hover:bg-indigo-700">
            Join Now
          </button>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-24 text-center text-white bg-gradient-to-r from-indigo-700 to-purple-700">
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Start Your Journey Today
        </h2>
        <p className="mb-8 text-lg">
          Whether it’s your next home or the right service, we’ve got you
          covered.
        </p>
        <button className="px-10 py-4 font-semibold text-indigo-700 transition bg-white rounded-full hover:bg-gray-100">
          Sign Up Free
        </button>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 bg-gray-900">
        <p>© {new Date().getFullYear()} RealConnect. Built with ❤️</p>
      </footer>
    </div>
  );
}
