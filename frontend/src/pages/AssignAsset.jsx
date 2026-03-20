import { useEffect, useState } from "react";
import { getUsers, getAvailableAssets, assignAsset } from "../services/api";
import Layout from "../components/Layout";

function AssignAsset() {
  const [users, setUsers] = useState([]);
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    employee: "",
    asset: "",
  });

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
    getAvailableAssets().then((res) => setAssets(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignAsset(formData);
      alert("Asset assigned successfully");
      setFormData({ employee: "", asset: "" });
    } catch (err) {
      console.error(err.response?.data);
      alert("Assignment failed");
    }
  };

  return (
    <Layout>
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow-sm">
            <div className="card-body">

              <h3 className="mb-4 text-center">Assign Asset</h3>

              <form onSubmit={handleSubmit}>

                {/* Select User */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Select User
                  </label>
                  <select
                    name="employee"
                    className="form-select"
                    value={formData.employee}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose user...</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.username}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Asset */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Select Asset
                  </label>
                  <select
                    name="asset"
                    className="form-select"
                    value={formData.asset}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose asset...</option>
                    {assets.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Assign Asset
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default AssignAsset;
