import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = {
      id: "6683c462af2466d04aa05dca",
      fullName: "John Doe",
      password: "password123",
      email: "johndoe@example.com",
      mobileNumber: "8089445999",
      company: "Example Inc.",
      role: "Software Engineer",
    };

    localStorage.setItem("user", JSON.stringify(user));
    console.log(localStorage.getItem("user"))

    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
