import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlusCircle, FaUsers, FaArrowRight, FaTimesCircle } from "react-icons/fa";
import Authnavbar from "../components/authnavbar";

function Create_team() {
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [createdBy, setCreatedBy] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      try {
        const decoded = JSON.parse(atob(savedToken.split(".")[1]));
        setCreatedBy(decoded.user_id);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  const handleAddUser = () => {
    if (newMember && !teamMembers.includes(newMember)) {
      setTeamMembers([...teamMembers, newMember]);
      setNewMember("");
    }
  };

  const handleRemoveUser = (member) => {
    setTeamMembers(teamMembers.filter((m) => m !== member));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!teamName || teamMembers.length === 0) {
      setError("Team name and at least one member are required.");
      return;
    }

    if (!createdBy) {
      setError("You must be logged in to create a team.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/team/create_team", {
        team_name: teamName,
        team_members: teamMembers,
        created_by: createdBy,
      });

      if (response.status === 200) {
        setSuccess("Team created successfully!");
        setTeamName("");
        setTeamMembers([]);
      }
    } catch (err) {
      console.error("Error creating team:", err);
      setError(err.response?.data?.detail || "Error creating team. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <Authnavbar />
      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-200">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Create a New Team
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Name */}
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">
                Team Name
              </label>
              <input
                id="teamName"
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter team name"
                required
              />
            </div>

            {/* Add Members */}
            <div>
              <label htmlFor="member" className="block text-sm font-medium text-gray-700 mb-1">
                Add Team Members (Names or Emails)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  id="member"
                  type="text"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter member name (e.g., Harsha)"
                />
                <button
                  type="button"
                  onClick={handleAddUser}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <FaPlusCircle className="text-xl" />
                </button>
              </div>
            </div>

            {/* Member List */}
            {teamMembers.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Team Members:</h3>
                <ul className="space-y-2">
                  {teamMembers.map((member, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm"
                    >
                      <span className="text-gray-800">{member}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveUser(member)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label={`Remove ${member}`}
                      >
                        <FaTimesCircle />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {error && (
              <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center space-x-2"
            >
              <FaUsers />
              <span>Create Team</span>
              <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create_team;
