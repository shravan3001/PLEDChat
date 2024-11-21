import axios, {AxiosInstance} from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const API_BASE_URL = BASE_URL;

const useAxiosWithInterceptors = (): AxiosInstance => {
    const jwtAxios = axios.create({ baseURL: API_BASE_URL });
    const navigate = useNavigate();

    jwtAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if(error.response?.status === 401 || 403) {
                const refresh_token = localStorage.getItem("refresh_token");
                if (refresh_token){
                    try{
                        const refresh_response = await axios.post("http://127.0.0.1:8000/api/token/refresh/",
                            { refresh: refresh_token });
                        const new_access_token = refresh_response.data.access;
                        localStorage.setItem("access_token", new_access_token);
                        originalRequest.headers["Authorization"] = `Bearer ${new_access_token}`;
                        return jwtAxios(originalRequest);
                    }
                    catch (refreshError) {
                        navigate("/login");
                        throw refreshError;
                    } 
                }else{
                    navigate("/login");
                    throw error;
                }
            }
            throw error;
        }
    )
    return jwtAxios;
};

export default useAxiosWithInterceptors;