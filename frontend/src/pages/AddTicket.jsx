import { useEffect, useState } from "react";
import { getAssets, createTicket } from "../services/api";
import Layout from "../components/Layout";

function AddTicket() {
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    asset: "",
    issue: "",
  });

  useEffect(() => {
    getAssets().then((res) => setAssets(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTicket(formData);
      alert("Ticket created successfully");
      setFormData({ asset: "", issue: "" });
    } catch {
      alert("Ticket creation failed");
    }
  };

  return (
    <Layout>
      <div className="row justify-content-center">
        <div className="col-md-7">

          <div className="card shadow-sm">
            <div className="card-body">

              <h3 className="mb-4 text-center">Raise Ticket</h3>

              <form onSubmit={handleSubmit}>

                {/* Select Asset */}
                <div className="mb-3">
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

                {/* Issue Description */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Issue Description
                  </label>
                  <textarea
                    name="issue"
                    rows="4"
                    className="form-control"
                    placeholder="Describe the issue clearly..."
                    value={formData.issue}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-warning"
                  >
                    Submit Ticket
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

export default AddTicket;
