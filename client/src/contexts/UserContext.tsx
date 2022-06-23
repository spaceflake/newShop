import { User } from '@shared/types';
import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserFetch } from '../Api/Api';
import { LoginDetails } from '../components/Forms/LoginForm';

interface UserContextValue {
  isLoading: boolean;
  user?: User;
  login: (loginDetails: LoginDetails) => Promise<boolean>;
  logout: () => void;
  getAllUsers: () => void;
  allUsers: User[];
}
export const UserContext = React.createContext<UserContextValue>({
  isLoading: false,
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false,
    adminRequested: false,
    phone: '',
    password: '',
    createdAt: new Date(),
    updateAt: new Date(),
  },
  allUsers: [],
  login: (_loginDetails: LoginDetails): Promise<boolean> => {
    return new Promise(() => {});
  },
  logout: () => {},
  getAllUsers: () => {},
});

export const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = React.useState<User>();
  const [allUsers, setAllUsers] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (loginDetails: LoginDetails) => {
    setIsLoading(true);

    return UserFetch(loginDetails)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
        if (user.isAdmin) {
          getAllUsers();
        }
        return true;
      })
      .catch((e) => {
        setIsLoading(false);
        throw e;
      });
  };
  useEffect(() => {
    axios.get('/api/logged').then((res: AxiosResponse) => {
      setUser(res.data);
    });
  }, []);
  const logout = async () => {
    // talk to server
    await axios.get('/api/user/logout').then((res: AxiosResponse) => {
      setUser(undefined);
      setIsLoading(false);
    });
  };
  const getAllUsers = async () => {
    setIsLoading(true);
    const response = await axios.get('/api/user');
    const res = await response.data;
    if (res) {
      setAllUsers(res);
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ getAllUsers, allUsers, user, isLoading, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export const useUser = () => useContext(UserContext);
