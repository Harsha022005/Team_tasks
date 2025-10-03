import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaUserTag, FaInfoCircle, FaUsers } from "react-icons/fa";
import Authnavbar from "../components/authnavbar";
import { Link } from "react-router-dom";

function Dashboard() {
  const [name, setName] = useState("");
  const [user_id, setuser_id] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [teamsCreated, setTeamsCreated] = useState([]);

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (!savedToken) return;

    try {
      const decoded = JSON.parse(atob(savedToken.split(".")[1]));
      console.log("Decoded token:", decoded);

      const id = decoded.user_id; 
      setuser_id(id);
      setEmail(decoded.user_email);
      setRole(decoded.role);
      setBio(decoded.user_bio || "");

      fetchUserCreatedTeams(id); 
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, []);

  async function fetchUserCreatedTeams(id) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/team/get_all_teams/${id}`);
      if (response.status === 200) {
        setTeamsCreated(response.data);
      }
    } catch (err) {
      console.error("Error fetching user created teams:", err);
    }
  }
  async function handle_redirect_to_team(team_id){
    window.location.href = `/team-chat/${team_id}`;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Authnavbar />

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          User Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Details Section */}
          <div className="lg:col-span-1 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700 flex items-center mb-6">
              <FaUser className="mr-3 text-blue-500" />
              User Profile
            </h2>
            <div className="space-y-4 text-gray-600 text-lg">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-500" />
                <p>
                  <span className="font-semibold">Email:</span> {email}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaUserTag className="text-blue-500" />
                <p>
                  <span className="font-semibold">Role:</span> {role}
                </p>
              </div>
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                <div className="flex items-center space-x-3 mb-2">
                  <FaInfoCircle className="text-blue-500" />
                  <p className="font-semibold text-gray-700">Bio:</p>
                </div>
                <p className="text-gray-600 italic">{bio || "No bio provided."}</p>
              </div>
            </div>
          </div>

          {/* Teams Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700 flex items-center mb-6">
              <FaUsers className="mr-3 text-green-500" />
              Teams Created
            </h2>
            {teamsCreated.length === 0 ? (
              <div className="p-6 bg-gray-100 rounded-md text-center">
                <p className="text-gray-500 text-lg">No teams have been created yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {teamsCreated.map((team) => (
                  <div
                    key={team.id}
                    className="p-6 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <p className="text-lg font-semibold text-gray-800">
                      <span className="text-blue-600">Team Name:</span> {team.team_name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium">Team ID:</span> {team.id}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium">Created At:</span>{" "}
                      {new Date(team.created_at).toLocaleString()}
                    </p>

                    {team.team_members?.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-600 mb-1">Members:</p>
                        <ul className="list-disc list-inside text-gray-500 text-sm">
                          {team.team_members.map((m, idx) => (
                            <li key={idx}>{m}</li>
                          ))}
                        </ul>
                      </div>
                      
                    )}

<div className="mt-4">
  <Link
    to={`/team-chat/${team.id}`}
    className="bg-blue-600 text-white  px-4 py-2 rounded-lg hover:bg-blue-700 transition"
  >
    Visit Team Chat
  </Link>
</div>

                   
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
