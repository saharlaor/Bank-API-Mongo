import axios from "axios";

const url =
  process.env.NODE_ENV === "production" ? "api" : "http://localhost:8080/api";

export default axios.create({ baseURL: url });
