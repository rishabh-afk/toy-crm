"use client";

import { Fetch } from "@/hooks/apiUtils";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { tabs } from "@/data/tabs";

interface AuthContextProps {
  user: any;
  token: string | null;
  login: (token: string, userData: object) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<object | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    navigate.prefetch("/dashboard");
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async (sharedToken: string) => {
      try {
        const endpoint = "api/user/get-current-user";
        const response: { success: boolean; data: any; message: string } =
          await Fetch(endpoint, {}, 5000, true, false);
        if (response?.success && response?.data) {
          setLoading(false);
          setToken(sharedToken);
          setUser(response?.data);
          const permissions = response?.data?.permissions;
          redirection(permissions);
        } else return navigate.replace("/auth/login");
      } catch (error) {
        setLoading(false);
        console.error(error);
        localStorage.clear();
        return navigate.replace("/auth/login");
      }
    };
    const sharedToken = localStorage.getItem("adminToken");
    if (sharedToken) fetchUser(sharedToken);
    else setLoading(false);
    // eslint-disable-next-line
  }, [navigate]);

  const login = (token: string, userData: any) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem("adminToken", token);
    const permissions = userData?.permissions;
    redirection(permissions);
  };

  const redirection = (permissions: any) => {
    const first =
      permissions.find((item: any) => item.access.read === true)?.module || "";
    if (first) {
      const link = tabs.find((item: any) => item.permission === first)?.href;
      if (link) {
        const getPathName = localStorage.getItem("pathname");
        return navigate.replace(getPathName ? getPathName : link);
      } else navigate.replace("/no-access");
    } else navigate.replace("/no-access");
  };

  const logout = () => {
    setToken(null);
    setUser({});
    localStorage.clear();
    return navigate.replace("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
