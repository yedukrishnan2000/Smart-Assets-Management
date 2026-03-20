import { useState } from "react";
import { addAsset } from "../services/api";
import Layout from "../components/Layout";

function AddAsset() {
  const [formData, setFormData] = useState({
    name: "",
    asset_type: "",
    serial_number: "",
    status: "AVAILABLE",
    purchase_date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAsset(formData);
      alert("Asset added successfully");

      // Reset form
      setFormData({
        name: "",
        asset_type: "",
        serial_number: "",
        status: "AVAILABLE",
        purchase_date: "",
      });
    } catch (error) {
      console.error(error.response?.data);
      alert("Error adding asset");
    }
  };

  return (
    <Layout>
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow-sm">
            <div className="card-body">

              <h3 className="mb-4 text-center">Add Asset</h3>

              <form onSubmit={handleSubmit}>

                {/* Asset Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Asset Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter asset name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Asset Type */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Asset Type
                  </label>
                  <input
                    type="text"
                    name="asset_type"
                    className="form-control"
                    placeholder="Enter asset type"
                    value={formData.asset_type}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Serial Number */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    name="serial_number"
                    className="form-control"
                    placeholder="Enter serial number"
                    value={formData.serial_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Status
                  </label>
                  <select
                    name="status"
                    className="form-select"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="ASSIGNED">ASSIGNED</option>
                  </select>
                </div>

                {/* Purchase Date */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    name="purchase_date"
                    className="form-control"
                    value={formData.purchase_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    Add Asset
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

export default AddAsset;
