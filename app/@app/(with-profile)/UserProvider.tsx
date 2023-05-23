"use client";

import React, { ReactNode } from "react";

type UserShape = {
  userId: string;
  name: string;
  nick: string;
  email: string;
  avatar: string | null;
};

// create react context for logged in user:
const UserContext = React.createContext<UserShape | null>(null);

interface UserProviderProps {
  children: ReactNode;
  user: UserShape;
}

function UserProvider({ children, user }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const user = React.useContext(UserContext);

  if (!user) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return user;
}

export default UserProvider;
