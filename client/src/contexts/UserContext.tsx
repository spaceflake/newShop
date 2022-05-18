import React, { useContext, useState } from "react";
import { FakeUserFetch } from "../Api/Api";
import { User } from "../Api/Data";
import { LoginDetails } from "../components/Forms/LoginForm";

interface UserContextValue {
  isLoading: boolean;
  user?: User;
  login: (loginDetails: LoginDetails) => Promise<boolean>;
  logout: () => void;
}

export const UserContext = React.createContext<UserContextValue>({
  isLoading: false,
  user: { username: "", password: "", isAdmin: false },
  login: (_loginDetails: LoginDetails): Promise<boolean> => {
    return new Promise(() => {});
  },
  logout: () => {},
});

export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (loginDetails: LoginDetails) => {
    setIsLoading(true);

    return FakeUserFetch(loginDetails)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
        return true;
      })
      .catch((e) => {
        setIsLoading(false);
        throw e;
      });
  };

  const logout = async () => {
    setUser(undefined);
    setIsLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export const useUser = () => useContext(UserContext);
