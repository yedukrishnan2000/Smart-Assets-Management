import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getMyTickets } from "../services/api";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getMyTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout>
      <h2>My Tickets</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Issue</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.id}>
              <td>{t.asset_name}</td>
              <td>{t.issue}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default MyTickets;
