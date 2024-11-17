import axios, {AxiosInstance} from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const API_BASE_URL = BASE_URL;

const useAxiosWithInterceptors = (): AxiosInstance => {
    const jwtAxios = axios.create({ baseURL: API_BASE_URL });
    const navigate = useNavigate();

    jwtAxios.interceptors.request.use(
        (response) => {
            return response;
        },
    async (error) => {
        if (error.response?.status === 401){
            navigate("/");
        }
        return Promise.reject(error);
    }
    )
    return jwtAxios;
};

export default useAxiosWithInterceptors;