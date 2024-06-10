"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "../_components/_hooks/useCurrentUser";
import { auth } from "../api/auth/[...nextauth]/route";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const { currentUser, isLoading } = useCurrentUser();

  const logoutUser = () => setUser(null);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
    <UserContext.Provider value={(user, logoutUser, isLoading)}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = function () {
  const user = useContext(UserContext);

  if (!user) throw new Error(`Can't use user context outside provider`);

  return user;
};
