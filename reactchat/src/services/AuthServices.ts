import AuthServicesProps from "../@types/auth-service";
import axios from "axios";
import { useState } from "react";

export function useAuthService(): AuthServicesProps {
    
    const getInitialLoggedInValue = () => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        return loggedIn!==null && loggedIn === "true";
    };
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>((getInitialLoggedInValue));

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

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
    };

    return {login, isLoggedIn, logout}
}