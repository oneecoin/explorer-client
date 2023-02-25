import axios from "axios";

export const mempool = axios.create({
    baseURL: "https://oneecoin-mempool-manager.onrender.com",
});


