import { MapPin, Globe, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../services/supabaseClients";
import { getVenueById } from "../services/getVenuesById";

export default function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVenue() {
      try {
        setLoading(true);
        const data = await getVenueById(id);
        setVenue(data);
      } catch (err) {
        console.error("Error loading venue details:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchVenue();
  }, [id]);

  console.log(venue);
  console.log(id);

  return (
    <div className="flex flex-col items-center w-full ">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] sm:h-[70vh]">
        <img
          src={venue?.image}
          // src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Venue Hero"
          className="absolute object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="px-4 text-4xl font-bold text-center text-white sm:text-6xl drop-shadow-lg">
            {venue?.name}
          </h1>
        </div>
      </div>

      {/* Info Card */}
      <div className="relative z-10 w-full max-w-5xl p-6 -mt-16 bg-white shadow-xl rounded-3xl sm:p-10">
        <div className="flex flex-col mb-6 sm:flex-row sm:justify-between sm:items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>{venue?.address}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Globe className="w-5 h-5 text-blue-600" />
              <a
                href="https://maps.google.com/?q=Lekki+Phase+1+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-blue-700"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
            <a
              href="https://www.google.com/maps/place/Lekki+Phase+1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Globe className="w-5 h-5" />
              Visit Website
            </a>

            <a
              href="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 text-white transition bg-red-600 rounded-lg hover:bg-red-700"
            >
              <Youtube className="w-5 h-5" />
              Watch Video
            </a>
          </div>
        </div>

        <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
          The Skyline Banquet Hall is a luxury event space designed to host
          weddings, corporate gatherings, and private celebrations. With
          breathtaking city views, premium lighting, and modern architecture, it
          provides the perfect ambience for memorable experiences.
          <br />
          <br />
          Our dedicated staff ensures every event is perfectly tailored — from
          decor and catering to audio-visual setups. Experience elegance and
          sophistication like never before at Skyline Banquet Hall.
        </p>
      </div>

      {/* Secondary Image */}
      <div className="w-full max-w-5xl px-4 mt-10">
        <img
          src={venue?.image1}
          // src="https://images.unsplash.com/photo-1600585154504-17e6e3f5a6b7?auto=format&fit=crop&w=1200&q=80"
          alt="Venue Interior"
          className="w-full rounded-3xl shadow-lg object-cover h-72 sm:h-[500px]"
        />
      </div>

      {/* Video Section */}
      <div className="w-full max-w-5xl px-4 mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-900 sm:text-3xl">
          Explore the Venue
        </h2>
        <div className="overflow-hidden shadow-lg aspect-video rounded-2xl">
          <iframe
            className="w-full h-full"
            src={venue?.videoUrl}
            title="Venue video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="w-full max-w-5xl mt-12 mb-8 text-center">
        <p className="mb-4 text-gray-600">
          Ready to host your next event at {venue?.name}
        </p>
        <button className="px-8 py-3 text-lg font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getVenueById } from "../services/getVenuesById";

// export default function VenueDetailsPage() {
//   const { id } = useParams(); // get the venue id from the URL
//   const [venue, setVenue] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchVenue() {
//       try {
//         setLoading(true);
//         const data = await getVenueById(id);
//         setVenue(data);
//       } catch (err) {
//         console.error("Error loading venue details:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (id) fetchVenue();
//   }, [id]);

//   console.log(venue);

//   if (loading)
//     return <p className="mt-10 text-center">Loading venue details...</p>;
//   if (!venue) return <p className="mt-10 text-center">Venue not found.</p>;

//   return (
//     <div className="max-w-5xl px-4 py-8 mx-auto">
//       <h1 className="mb-4 text-3xl font-bold">{venue.name}</h1>
//       <p className="mb-6 text-gray-700">{venue.description}</p>

//       {/* Display images */}
//       <div className="flex flex-col gap-4 sm:flex-row">
//         {venue.image && (
//           <img
//             src={venue.image}
//             alt="Venue"
//             className="object-cover w-full h-64 shadow rounded-xl sm:w-1/2"
//           />
//         )}
//         {venue.image1 && (
//           <img
//             src={venue.image1}
//             alt="Venue"
//             className="object-cover w-full h-64 shadow rounded-xl sm:w-1/2"
//           />
//         )}
//       </div>

//       {/* Optional YouTube video */}
//       {venue.videoUrl && (
//         <div className="mt-8 overflow-hidden shadow-lg aspect-video rounded-2xl">
//           <iframe
//             src={venue.videoUrl.replace("watch?v=", "embed/")}
//             title="Venue video"
//             className="w-full h-full"
//             allowFullScreen
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// }
