import React from "react";

const ArtisansPage = () => {
  const artisans = [
    {
      id: 1,
      name: "John Okafor",
      skill: "Carpenter",
      location: "Lagos, Nigeria",
      bio: "Expert in custom furniture and woodwork with 10+ years of experience.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Grace Adeniyi",
      skill: "Tailor",
      location: "Abuja, Nigeria",
      bio: "Specialist in bespoke tailoring, wedding dresses, and alterations.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Samuel Eze",
      skill: "Electrician",
      location: "Port Harcourt, Rivers",
      bio: "Certified electrician handling home and industrial electrical projects.",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    {
      id: 4,
      name: "Mary Chukwu",
      skill: "Caterer",
      location: "Enugu, Nigeria",
      bio: "Passionate about creating African and continental dishes for events.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 5,
      name: "Ahmed Musa",
      skill: "Plumber",
      location: "Kano, Nigeria",
      bio: "Reliable plumber for home, office, and industrial piping solutions.",
      image: "https://randomuser.me/api/portraits/men/77.jpg",
    },
  ];

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl">
      <h1 className="mb-8 text-3xl font-bold text-center">
        Meet Our Artisans & Craftsmen
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artisans.map((artisan) => (
          <div
            key={artisan.id}
            className="overflow-hidden transition bg-white shadow-md rounded-2xl hover:shadow-xl"
          >
            <img
              src={artisan.image}
              alt={artisan.name}
              className="object-cover w-full h-56"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{artisan.name}</h2>
              <p className="font-medium text-blue-600">{artisan.skill}</p>
              <p className="text-sm text-gray-500">{artisan.location}</p>
              <p className="mt-2 text-sm text-gray-700">{artisan.bio}</p>
              <button className="w-full py-2 mt-4 text-white transition bg-green-600 rounded-lg hover:bg-green-700">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtisansPage;
