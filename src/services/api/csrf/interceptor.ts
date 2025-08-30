import axios from "axios";

// buat instance axios
const csrfInterceptor = axios.create({
    withCredentials: true,
});

// request interceptor: dipanggil sebelum semua request
csrfInterceptor.interceptors.request.use(async (config) => {
    return config;
});

export default csrfInterceptor;
