import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    API.get("assets/")
      .then((res) => setAssets(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔎 Filtering Logic
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.asset_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serial_number.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || asset.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <h2 className="mb-4">Assets</h2>

      <div className="card shadow-sm">
        <div className="card-body">

          {/* 🔎 Search + Filter Row */}
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, type, or serial..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="ASSIGNED">Assigned</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Serial</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    <tr key={asset.id}>
                      <td>{asset.name}</td>
                      <td>{asset.asset_type}</td>
                      <td>{asset.serial_number}</td>
                      <td>
                        {asset.status === "AVAILABLE" ? (
                          <span className="badge bg-success">
                            AVAILABLE
                          </span>
                        ) : (
                          <span className="badge bg-secondary">
                            ASSIGNED
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No matching assets found
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

export default Assets;
