import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login(username, password);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      localStorage.setItem("user_id", res.data.user.id);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("is_staff", res.data.user.is_staff);

      if (res.data.user.is_staff) {
        localStorage.setItem("role", "ADMIN");
      } else {
        localStorage.setItem("role", "EMPLOYEE");
      }

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="card shadow" style={{ width: "400px" }}>
        <div className="card-body p-4">

          <h3 className="text-center mb-4">
            Smart Asset Manager
          </h3>

          <form onSubmit={handleLogin}>

            {/* Username */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;
