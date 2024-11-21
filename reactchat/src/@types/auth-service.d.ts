export interface AuthServicesProps{
 login: (username: string, password: string) => any;
 isLoggedIn: boolean;
 logout: () => any;
};
export default AuthServicesProps;