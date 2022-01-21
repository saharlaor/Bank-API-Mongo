import axios from "axios";

const url =
  process.env.NODE_ENV === "production" ? "api" : "http://localhost:5000/api";

export default axios.create({ baseURL: url });
