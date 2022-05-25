import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { UserFetch } from '../Api/Api';
import { UserInterface } from '../InterFaces';
import { LoginDetails } from '../components/Forms/LoginForm';

interface UserContextValue {
  isLoading: boolean;
  user?: UserInterface;
  login: (loginDetails: LoginDetails) => Promise<boolean>;
  logout: () => void;
  allUsers: any;
}
export const UserContext = React.createContext<UserContextValue>({
  isLoading: false,
  user: {id: '',firstName: '', lastName: '', email: '', isAdmin: false },
  allUsers: [],
  login: (_loginDetails: LoginDetails): Promise<boolean> => {
    return new Promise(() => {});
  },
  logout: () => {},
});

export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = React.useState<UserInterface>();
  const [allUsers, setAllUsers] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);


 
  const login = async (loginDetails: LoginDetails) => {
    setIsLoading(true);

    return UserFetch(loginDetails)
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
  useEffect(() => {
    axios.get("http://localhost:4000/api/logged", { withCredentials: true }).then((res: AxiosResponse) => {
      setUser(res.data);
    })
}, []);
  const logout = async () => {
    // talk to server
    await axios
      .get('http://localhost:4000/logout')
      .then((res: AxiosResponse) => {
        console.log(res.data.message);
        setUser(undefined);
        setIsLoading(false);
      });
  };
  const getAllProducts = async () => {
    const response = await axios.get('http://localhost:4000/api/user');
    const res = await response.data;
    setAllUsers(res)
    console.log(res);
  };
  useEffect(() => {
    getAllProducts()
  }, []);
  return (
    <UserContext.Provider value={{ allUsers, user, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export const useUser = () => useContext(UserContext);
