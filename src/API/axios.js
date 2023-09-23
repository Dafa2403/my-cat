import axios from "axios";

const BASE_URL = " https://api.thecatapi.com/v1/";

export default axios.create({
  baseURL: BASE_URL,
});
