import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001",
});

// Attach token for protected routes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (userData) => API.post("/Signup", userData);
export const signin = (userData) => API.post("/signin", userData);
export const fetchAuctions = () => API.get("/auctions");
export const createAuction = (auctionData) => API.post("/auction", auctionData);
export const bidOnAuction = (auctionId, bidAmount) =>
  API.post(`/bid/${auctionId}`, { bid: bidAmount });

export default API;
