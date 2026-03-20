import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDashboardStats } from "../services/api";
import { FaBox, FaUserCheck, FaTicketAlt } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_assets: 0,
    assigned_assets: 0,
    open_tickets: 0,
  });

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-4">

        {/* TOTAL ASSETS */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex align-items-center">
              <FaBox size={40} className="text-primary me-3" />
              <div>
                <h6 className="text-muted">Total Assets</h6>
                <h3>{stats.total_assets}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* ASSIGNED ASSETS */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex align-items-center">
              <FaUserCheck size={40} className="text-success me-3" />
              <div>
                <h6 className="text-muted">Assigned Assets</h6>
                <h3>{stats.assigned_assets}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* OPEN TICKETS */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex align-items-center">
              <FaTicketAlt size={40} className="text-danger me-3" />
              <div>
                <h6 className="text-muted">Open Tickets</h6>
                <h3>{stats.open_tickets}</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;
