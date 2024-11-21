import React, { createContext, useContext } from "react";
import { AuthServicesProps } from "../@types/auth-service.d";
import { useAuthService } from "../services/AuthServices";

const AuthServiceContext = createContext<AuthServicesProps | null>(null);

export function AuthServiceProvider(props: React.PropsWithChildren<{}>) {
  const authServices = useAuthService();
  return (
    <AuthServiceContext.Provider value={authServices}>
      {props.children}
    </AuthServiceContext.Provider>
  );
}

export function useAuthServiceContext(): AuthServicesProps {
  const context = useContext(AuthServiceContext);
  if (!context) {
    throw new Error(
      "useAuthServices must be used within a AuthServiceProvider",
    );
  }
  return context;
}

export default AuthServiceProvider;
