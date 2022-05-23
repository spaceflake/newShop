
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import Axios, { AxiosResponse } from 'axios'
import { UserInterface } from '../InterFaces'

export const APIContext = createContext<any>({})
export default function Context(props: PropsWithChildren<any>) {
  const [user,setUser] = useState<UserInterface>()
  useEffect(() => {
      Axios.get("http://localhost:4000/api/logged", { withCredentials: true }).then((res: AxiosResponse) => {
        setUser(res.data);
        console.log(user?.firstName);
        
      })

  }, [user]);

  return (
    <APIContext.Provider value={user}>{props.children}</APIContext.Provider>
    )
}


