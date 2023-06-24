import axios from "axios";

const axiosInstance = axios.create({
 baseURL: 'https://chat-zone-server-api.onrender.com',
})

export default axiosInstance;