import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://study-sync-server-gules.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;