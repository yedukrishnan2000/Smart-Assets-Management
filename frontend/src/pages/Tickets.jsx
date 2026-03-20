import { useEffect, useState } from "react";
import API, {
  assignTechnician,
  getUsers,
  updateTicketStatus,
} from "../services/api";
import Layout from "../components/Layout";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const isAdmin = localStorage.getItem("is_staff") === "true";
  const loggedUserId = Number(localStorage.getItem("user_id"));

  const loadTickets = () => {
    API.get("tickets/")
      .then((res) => setTickets(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadTickets();

    if (isAdmin) {
      getUsers()
        .then((res) => setUsers(res.data))
        .catch((err) => console.error(err));
    }
  }, [isAdmin]);

  const getStatusBadge = (status) => {
    if (status === "OPEN") return "badge bg-danger";
    if (status === "IN_PROGRESS") return "badge bg-warning text-dark";
    if (status === "CLOSED") return "badge bg-success";
    return "badge bg-secondary";
  };

  return (
    <Layout>
      <h2 className="mb-4">Tickets</h2>

      <div className="card shadow-sm">
        <div className="card-body">

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Asset</th>
                  <th>Issue</th>
                  <th>Status</th>
                  <th>Technician</th>
                  {isAdmin && <th>Assign</th>}
                </tr>
              </thead>

              <tbody>
                {tickets.map((t) => {
                  const isAssignedTechnician =
                    t.assigned_technician === loggedUserId;

                  return (
                    <tr key={t.id}>
                      {/* Asset */}
                      <td>{t.asset_name}</td>

                      {/* Issue */}
                      <td>{t.issue}</td>

                      {/* STATUS */}
                      <td>
                        {isAssignedTechnician ? (
                          <select
                            className="form-select form-select-sm"
                            value={t.status}
                            onChange={(e) =>
                              updateTicketStatus(t.id, e.target.value)
                                .then(() => loadTickets())
                                .catch(() =>
                                  alert("Status update failed")
                                )
                            }
                          >
                            <option value="OPEN">OPEN</option>
                            <option value="IN_PROGRESS">
                              IN PROGRESS
                            </option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        ) : (
                          <span className={getStatusBadge(t.status)}>
                            {t.status}
                          </span>
                        )}
                      </td>

                      {/* Technician name */}
                      <td>
                        {t.technician_name ? (
                          <span className="fw-semibold">
                            {t.technician_name}
                          </span>
                        ) : (
                          <span className="text-muted">
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* ADMIN → ASSIGN TECHNICIAN */}
                      {isAdmin && (
                        <td>
                          {!t.assigned_technician ? (
                            <select
                              className="form-select form-select-sm"
                              onChange={(e) =>
                                assignTechnician(
                                  t.id,
                                  e.target.value
                                )
                                  .then(() => loadTickets())
                                  .catch(() =>
                                    alert("Assignment failed")
                                  )
                              }
                            >
                              <option value="">
                                Assign Technician
                              </option>
                              {users
                                .filter((u) => !u.is_staff)
                                .map((u) => (
                                  <option key={u.id} value={u.id}>
                                    {u.username}
                                  </option>
                                ))}
                            </select>
                          ) : (
                            <span className="badge bg-primary">
                              Assigned
                            </span>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Tickets;
