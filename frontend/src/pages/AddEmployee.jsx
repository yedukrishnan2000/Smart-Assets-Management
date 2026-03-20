import { useState } from "react";
import { addEmployee } from "../services/api";
import Layout from "../components/Layout";

function AddEmployee() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "EMPLOYEE",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(formData);
      alert("Employee added successfully");
      setFormData({
        username: "",
        password: "",
        email: "",
        role: "EMPLOYEE",
      });
    } catch (err) {
      alert("Failed to add employee");
    }
  };

  return (
    <Layout>
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow-sm">
            <div className="card-body">

              <h3 className="mb-4 text-center">Add Employee</h3>

              <form onSubmit={handleSubmit}>

                {/* Username */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Add Employee
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

export default AddEmployee;
