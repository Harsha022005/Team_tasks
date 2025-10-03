import { Link, useLocation } from "react-router-dom";

function Authnavbar() {
  const location = useLocation();
  
  const handle_logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email");
  };



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
                to="/dashboard"
                className={`${
                  location.pathname === "/dashboard"
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                } transition duration-200`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/create-team"
                className={`${
                  location.pathname === "/create-team"
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                } transition duration-200`}
              >
                Create_team
              </Link>
            </li>
            <li>
            <button onClick={handle_logout} className="focus:outline-none">
                <Link to ="/" className="text-gray-700 hover:text-blue-600 transition duration-200">
                Logout
              </Link>
            </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Authnavbar;
