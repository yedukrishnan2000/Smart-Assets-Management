import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getMyTickets, updateTicketStatus } from "../services/api";

const TechnicianTickets = () => {
  const [tickets, setTickets] = useState([]);

  const loadTickets = () => {
    getMyTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleStatusChange = (ticketId, newStatus) => {
    updateTicketStatus(ticketId, newStatus)
      .then(() => {
        alert("Status updated");
        loadTickets();
      })
      .catch(() => alert("Permission denied"));
  };

  return (
    <Layout>
      <h2>My Assigned Tickets</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Issue</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.id}>
              <td>{t.asset_name}</td>
              <td>{t.issue}</td>
              <td>{t.status}</td>
              <td>
                <select
                  value={t.status}
                  onChange={(e) =>
                    handleStatusChange(t.id, e.target.value)
                  }
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default TechnicianTickets;
