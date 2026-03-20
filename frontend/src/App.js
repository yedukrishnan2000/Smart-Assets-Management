import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Inventory from "./pages/Inventory";
import Assignments from "./pages/Assignments";
import Tickets from "./pages/Tickets";
import AddTicket from "./pages/AddTicket";
import AddAsset from "./pages/AddAsset";
import AssignAsset from "./pages/AssignAsset";
import AddEmployee from "./pages/AddEmployee";
import MyTickets from "./pages/MyTickets";
import TechnicianTickets from "./pages/TechnicianTickets";
import Profile from "./pages/Profile";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/add-ticket" element={<AddTicket />} />
        <Route path="/add-asset" element={<AddAsset />} />
        <Route path="/assign" element={<AssignAsset />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/technician-tickets" element={<TechnicianTickets />} />
        <Route path="/profile" element={<Profile />} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
