import moment from "moment";

export const formatTime = (unixTime: number) => {
    return moment.unix(unixTime).format("YYYY-MM-DD HH:mm:ss");
};
