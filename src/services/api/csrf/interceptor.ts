import axios from "axios";
import { CsrfRequest } from "@/services/api/csrf/index";

// buat instance axios
const csrfInterceptor = axios.create({
    withCredentials: true,
});

// request interceptor: dipanggil sebelum semua request
csrfInterceptor.interceptors.request.use(async (config) => {
    // panggil endpoint CSRF hanya sekali, atau bisa panggil setiap request
    await CsrfRequest();
    return config;
});

export default csrfInterceptor;
