import axios from "axios";
import { baseUrl } from "../constance";

const axiosInstance = axios.create({
 baseURL : baseUrl
})

export default axiosInstance;