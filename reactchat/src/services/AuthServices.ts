import AuthServicesProps from "../@types/auth-service";
import axios from "axios";
import { useState } from "react";

export function useAuthService(): AuthServicesProps {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn !== null) {
            
            return Boolean(loggedIn);
        }else{
            return false;
        }
    });

    const getUserDetails  = async () => {
        try{
            const userId = localStorage.getItem("user_id");
            const accessToken = localStorage.getItem("access_token");
            const response = await axios.get(`http://127.0.0.1:8000/api/account/?user_id=${userId}`,
                {headers:{Authorization: `Bearer ${accessToken}`}},
            );
            const userDetails = response.data;
            localStorage.setItem("username", userDetails.username);

        } catch (error: any) {
            setIsLoggedIn(false);
            localStorage.setItem("isLoggedIn", "false");
            return error;
        }
    }; 

    const getUserIdFromToken = (access: string) => {
        const token = access;
        if (token) {
            const payload = token.split(".")[1];
            const decodedPayload = atob(payload);
            const parsedPayload = JSON.parse(decodedPayload);
            return parsedPayload.user_id;
        }
        return null;
    }

    const login  = async (username: string, password: string) => {
        try{
            const response = await axios.post("http://127.0.0.1:8000/api/token/", {
                username,
                password,
            });
            const {access, refresh} = response.data;
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            localStorage.setItem("user_id", getUserIdFromToken(access));
            localStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
            getUserDetails();

        } catch (error: any) {
            return error;
        }
    };
    return {login, isLoggedIn}
}