import { createContext, ReactNode, useContext, useState } from "react";
import { googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import { useConfigContext } from "./ConfigurationContext";

type User = { email: string };

interface AuthenticationContextType {
  isAuthEnabled: boolean;
  user?: User;
  isAuthenticated: boolean;
  logIn: (authToken: string | undefined | null) => void;
  logOut: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const AuthenticationContextProvider = ({ children }: Props) => {
  const { auth } = useConfigContext();
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logIn = (authToken: string | undefined | null) => {
    if (!authToken) {
      return;
    }

    const user = {
      email: parseJwt(authToken).email
    };

    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("AuthToken", authToken);
  };

  const logOut = () => {
    googleLogout();
    setUser(undefined);
    setIsAuthenticated(false);
    localStorage.removeItem("AuthToken");
  };

  const isAuthEnabled = auth.isEnabled;

  if (isAuthEnabled && !auth.googleClientId) {
    throw Error(
      "There's an error in the config file. 'google_client_id' must be set to a Google API client ID when 'authenticate' is set to True. See https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid."
    );
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthEnabled,
        user,
        isAuthenticated: isAuthEnabled ? isAuthenticated : true,
        logIn,
        logOut
      }}
    >
      <GoogleOAuthProvider clientId={auth.googleClientId ?? ""}>{children}</GoogleOAuthProvider>
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error("useAuthenticationContext must be used within a AuthenticationContextProvider");
  }
  return context;
};
