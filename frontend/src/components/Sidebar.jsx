import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const isStaff = localStorage.getItem("is_staff") === "true";

  const rawGroups = localStorage.getItem("groups");
  let groups = [];

  if (rawGroups) {
    try {
      groups = JSON.parse(rawGroups);
    } catch {
      groups = [rawGroups];
    }
  }

  const isTechnician = groups.includes("Technician");
  const isEmployee = !isStaff && !isTechnician;

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white text-decoration-none sidebar-active"
      : "text-white text-decoration-none";

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <h4 className="mb-4">Asset Manager</h4>

      <ul className="list-unstyled">

        <li className="mb-2">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </li>

        {isEmployee && (
          <>
            <li className="mb-2">
              <NavLink to="/assets" className={linkClass}>
                Assets
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/tickets" className={linkClass}>
                Tickets
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/assignments" className={linkClass}>
                My Assets
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/add-ticket" className={linkClass}>
                Raise Ticket
              </NavLink>
            </li>
          </>
        )}

        {isTechnician && (
          <li className="mb-2">
            <NavLink to="/technician-tickets" className={linkClass}>
              My Assigned Tickets
            </NavLink>
          </li>
        )}

        {isStaff && (
          <>
            <li className="mb-2">
              <NavLink to="/assets" className={linkClass}>
                Assets
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/tickets" className={linkClass}>
                Tickets
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/inventory" className={linkClass}>
                Inventory
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/assign" className={linkClass}>
                Assign Asset
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/assignments" className={linkClass}>
                Assignments
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/add-asset" className={linkClass}>
                Add Asset
              </NavLink>
            </li>

            <li className="mb-2">
              <NavLink to="/add-employee" className={linkClass}>
                Add Employee
              </NavLink>
            </li>
          </>
        )}

        <li className="mb-2">
          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
