import axios from "axios";

export const CsrfRequest = async () => {
    return await axios.get("/api/csrf", { withCredentials: true });
};
