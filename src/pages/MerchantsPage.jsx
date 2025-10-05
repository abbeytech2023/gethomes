import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useFetchUsersWithId } from "../hooks/useFetchUsers";
import SpinnerMini from "../components/SpinnerMini";

const TechnicianCard = ({ technician }) => {
  console.log(technician);

  !technician && <SpinnerMini />;

  return (
    <>
      <div className="flex flex-col mt-32 overflow-hidden bg-white shadow-lg rounded-2xl sm:flex-row">
        {/* Profile Image */}
        <div className="flex items-center justify-center w-full p-4 bg-blue-100 sm:w-1/3">
          <img
            className="w-24 h-24 border-4 border-white rounded-full shadow-md"
            src={technician.image}
            alt={technician.name}
          />
        </div>

        {/* Details */}
        <div className="w-full p-5 text-center sm:w-2/3 sm:text-left">
          <h2 className="text-lg font-bold text-gray-900">{technician.name}</h2>
          <p className="text-sm text-gray-600">{technician.role}</p>

          <div className="mt-3 space-y-1 text-sm text-gray-700">
            <p>📞 {technician.phone}</p>
            <p>📧 {technician.email}</p>
            <p>🏢 {technician.officeAdress}</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center mt-3 space-x-3 sm:justify-start">
            <button className="text-blue-400 hover:text-blue-600">
              {OpenGoogleInNewTab(technician.googleBusiness, "Google")}
            </button>
            <button className="text-blue-700 hover:text-blue-900">
              {OpenGoogleInNewTab(technician.facebookLink, "Facebook")}
            </button>
            <button className="text-pink-500 cursor-pointer hover:text-pink-700">
              {OpenGoogleInNewTab(technician.instagramLink, "instagram")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

function OpenGoogleInNewTab(link, label) {
  const handleOpen = () => {
    window.open(link, "_blank");
  };

  console.log(link);

  return (
    <Link to={link} onClick={handleOpen}>
      {label}
    </Link>
  );
}

const TechnicianGrid = () => {
  const { id } = useParams();

  const { documents, isLoading, error } = useFetchUsersWithId(id);

  return (
    <>
      <div className="grid max-w-6xl gap-6 p-4 px-12 mx-auto mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {documents?.map((tech, index) => (
          <TechnicianCard key={index} technician={tech} />
        ))}
      </div>
      <div className="mt-[9rem]   mx-auto">
        <Button to="/homeessentials" type="secondary">
          Back
        </Button>
      </div>
    </>
  );
};

export default TechnicianGrid;
