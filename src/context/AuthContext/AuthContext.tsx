import {
  createContext,
  useState,
  type ReactNode,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isTokenExpired = (jwt: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(jwt);
    const now = Date.now() / 1000;
    return decoded.exp !== undefined && decoded.exp < now;
  } catch {
    return true;
  }
};

const getInitialToken = (): string | null => {
  const stored = localStorage.getItem("token");
  if (stored && !isTokenExpired(stored)) return stored;
  return null;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(getInitialToken);

  const login = useCallback((newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
