import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white bg-gray-900">
      <h2 className="mt-4 text-2xl font-semibold text-center md:text-4xl">
        Oops! Page not found
      </h2>
      <p className="max-w-md mt-2 text-center text-gray-400">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 mt-6 font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
      >
        Go Back Home
      </Link>
    </div>
  );
}
