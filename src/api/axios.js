import axios from "axios";
import { baseUrl } from "../utils/constance";

const axiosInstance = axios.create({
 baseURL : baseUrl,
})

export default axiosInstance;