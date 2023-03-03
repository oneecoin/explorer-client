import axios from "axios";

export const mempool = axios.create({
    baseURL: "https://mempool.oneecoin.site",
});

export const getPeersCount = async () => {
    const res = await mempool.get("/peers/count");
    return res.data;
};
