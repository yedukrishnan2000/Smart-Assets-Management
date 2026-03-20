import { useEffect, useState } from "react";
import API, { returnAsset } from "../services/api";
import Layout from "../components/Layout";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const isAdmin = localStorage.getItem("is_staff") === "true";

  const loadAssignments = () => {
    API.get("assignments/")
      .then((res) => setAssignments(res.data))
      .catch((err) =>
        console.error("Failed to load assignments", err)
      );
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleReturn = (assignmentId) => {
    if (!window.confirm("Return this asset?")) return;

    returnAsset(assignmentId)
      .then(() => {
        alert("Asset returned successfully");
        loadAssignments();
      })
      .catch((err) => {
        console.error(err);
        alert("Return failed");
      });
  };

  return (
    <Layout>
      <h2 className="mb-4">Assignments</h2>

      <div className="card shadow-sm">
        <div className="card-body">

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Asset</th>
                  <th>Employee</th>
                  <th>Date Assigned</th>
                  <th>Date Returned</th>
                  {isAdmin && <th>Action</th>}
                </tr>
              </thead>

              <tbody>
                {assignments.length > 0 ? (
                  assignments.map((a) => (
                    <tr key={a.id}>
                      <td>{a.asset_name}</td>

                      <td>
                        {a.employee_name ? (
                          <span className="fw-semibold">
                            {a.employee_name}
                          </span>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>

                      <td>{a.date_assigned}</td>

                      <td>
                        {a.date_returned ? (
                          <span className="badge bg-success">
                            {a.date_returned}
                          </span>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            Not Returned
                          </span>
                        )}
                      </td>

                      {isAdmin && (
                        <td>
                          {!a.date_returned ? (
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                handleReturn(a.id)
                              }
                            >
                              Return
                            </button>
                          ) : (
                            <span className="text-muted">
                              -
                            </span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={isAdmin ? 5 : 4}
                      className="text-center"
                    >
                      No assignments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Assignments;
