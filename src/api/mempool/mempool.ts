import axios from "axios";

export const mempool = axios.create({
    baseURL: "https://oneecoin-mempool-manager.onrender.com",
});

export const getPeersCount = async () => {
    const res = await mempool.get("/peers/count");
    return res.data;
};
