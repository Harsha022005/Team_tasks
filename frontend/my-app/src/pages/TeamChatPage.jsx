import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeamChat from "../components/TeamChat";

const TeamChatPage = () => {
  const { team_id } = useParams();
  const [user_id, setUserId] = useState("");
  const [user_name, setUserName] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (!savedToken) return;

    try {
      const decoded = JSON.parse(atob(savedToken.split(".")[1]));
      setUserId(decoded.user_id);
      setUserName(decoded.user_name || decoded.user_email);
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, []);

  if (!user_id) return <p>Loading...</p>;

  return <TeamChat team_id={team_id} user_id={user_id} user_name={user_name} />;
};

export default TeamChatPage;
