import { Link, useLocation } from "react-router-dom";

function Unauthnavbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
       
          <div className="text-2xl font-bold text-blue-600">
            Team Tasks
          </div>

          {/* Nav Links */}
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/"
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                } transition duration-200`}
              >
                Signup
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`${
                  location.pathname === "/login"
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                } transition duration-200`}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Unauthnavbar;
