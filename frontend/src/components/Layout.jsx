import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4 bg-light" style={{ minHeight: "100vh" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
