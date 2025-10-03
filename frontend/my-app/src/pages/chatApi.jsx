import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/chat";

export async function sendMessage(team_id, sender_id, message) {
  return axios.post(`${API_BASE}/send_message`, {
    team_id,
    sender_id,
    message,
  });
}

export async function getTeamMessages(team_id) {
  const res = await axios.get(`${API_BASE}/get_team_messages/${team_id}`);
  return res.data;
}
