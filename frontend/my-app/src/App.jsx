import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import Dashboard from './pages/Dashboard';
import Create_team from './pages/Create_team';
import PrivateRoutes from './components/protectedroute';
import TeamChatPage from './pages/TeamChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={ <PrivateRoutes><Dashboard /></PrivateRoutes> } />
        <Route path='/create-team' element={<PrivateRoutes><Create_team/></PrivateRoutes>} />
           <Route path="/team-chat/:team_id" element={<TeamChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
