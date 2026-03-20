import axios from "axios";

const API = axios.create({
  baseURL: "/api/",
});

// attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("access");

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// LOGIN
export const login = (username, password) => {
  return API.post("login/", { username, password });
};

// GET ASSETS
export const getAssets = () => {
  return API.get("assets/");
};

// ✅ ADD ASSET (NEW)
export const addAsset = (data) => {
  return API.post("assets/", data);
};

export const returnAsset = (assignmentId) => {
  return API.post(`assignments/${assignmentId}/return_asset/`);
};

export const addEmployee = (data) => {
  return API.post("users/", data);
};



export const assignTechnician = (ticketId, technicianId) => {
  return API.patch(`tickets/${ticketId}/`, {
    assigned_technician: technicianId,
  });
};


export const updateTicketStatus = (ticketId, status) => {
  return API.patch(`tickets/${ticketId}/`, {
    status: status,
  });
};

export const getDashboardStats = () => {
  return API.get("dashboard/");
};

export const getMyTickets = () => {
  return API.get("tickets/my_tickets/");
};






export const getUsers = () => API.get("users/");
export const getAvailableAssets = () => API.get("assets/?status=AVAILABLE");
export const assignAsset = (data) => API.post("assignments/", data);
export const getTickets = () => API.get("tickets/");
export const createTicket = (data) => API.post("tickets/", data);
export const getCurrentUser = () => API.get("me/");
export const changePassword = (data) => API.post("change-password/", data);




export default API;
