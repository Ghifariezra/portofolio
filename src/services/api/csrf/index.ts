import axios from "axios";

export const CsrfRequest = async () => {
    const res = await axios.get("/api/csrf", { withCredentials: true });
    return res.data;
};
