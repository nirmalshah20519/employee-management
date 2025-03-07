import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct default import for jwtDecode
import { CustomJwtPayload } from "@/types/auth.type";

type User = {
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  authorize: (token: string, type: string) => User | null;
  unauthorize: () => void;
  isAuthenticated: boolean;
  isInitialized: boolean; // New state to track initialization
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // Track initialization

  const authorize = (token: string, type: string): User | null => {
    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      // console.log(decodedToken);
      const { email } = decodedToken;

      if (!email) {
        throw new Error("Invalid token");
      }

      const user = { email, role: type };
      console.log(user);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
      localStorage.setItem("type", type);
      return user;
    } catch (error) {
      console.error("Authorization failed:", error);
      unauthorize();
      return null;
    }
  };

  const unauthorize = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type") || '';
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        const { email } = decodedToken;

        if (email) {
          setUser({ email, role: type.toLowerCase() });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error decoding token during initialization:", error);
        unauthorize();
      }
    }
    setIsInitialized(true); // Mark initialization as complete
  }, []);

  const value = useMemo(
    () => ({
      user,
      authorize,
      unauthorize,
      isAuthenticated,
      isInitialized, // Provide initialization state in context
    }),
    [user, isAuthenticated, isInitialized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
