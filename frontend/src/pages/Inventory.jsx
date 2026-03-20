import React, { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

const Inventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get("inventory/")
      .then((res) => {
        console.log("Inventory data:", res.data);
        setItems(res.data);
      })
      .catch((err) => console.log("Inventory error", err));
  }, []);

  // 🔹 Stock Level Badge Logic
  const getStockBadge = (quantity, threshold) => {
    if (quantity <= threshold) return "badge bg-danger"; // Low stock
    if (quantity <= threshold + 5) return "badge bg-warning text-dark"; // Medium
    return "badge bg-success"; // Good stock
  };

  return (
    <Layout>
      <h2 className="mb-4">Inventory</h2>

      <div className="card shadow-sm">
        <div className="card-body">

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Item Type</th>
                  <th>Quantity</th>
                  <th>Threshold</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.item_type}</td>
                      <td>{item.quantity}</td>
                      <td>{item.threshold}</td>
                      <td>
                        <span
                          className={getStockBadge(
                            item.quantity,
                            item.threshold
                          )}
                        >
                          {item.quantity <= item.threshold
                            ? "Low Stock"
                            : item.quantity <= item.threshold + 5
                            ? "Medium"
                            : "Good"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No inventory data available
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
};

export default Inventory;
