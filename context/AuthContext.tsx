import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { getUserData, getSession } from "../utils/auth";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextData = {
  user: any;
  setUser: any;
  isAuth: boolean;
  setIsAuth: any;
  userData: any;
  setUserData: any;
  session: any;
  setSession: any;
  validated: any;
  userLocation: any
  setUserLocation: any
  slug: any;
  setSlug: any;
  redirectBackToClaimPoints: any;
  setRedirectBackToClaimPoints: any;
};

export const AuthContext = createContext({} as AuthContextData);

export const useAuthProvider = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [userLocation, setUserLocation] = useState({
    lng: 1.353772131,
    lat: 44.01793933,
  });
  const [session, setSession] = useState<any>(null);
  const [validated, setValidated] = useState<boolean>(false);
  const [slug, setSlug] = useState<string>('')
  const [redirectBackToClaimPoints, setRedirectBackToClaimPoints] = useState<boolean>(false)

  async function startSession() {
    try {
      await getSession().then((res: any) => {
        setUser(res.session.user);
        setSession(res.session);
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  // when there is a user get the users data, and set authenticated to true
  useMemo(() => {
    if (user) {
      getUserData(user.id).then((res: any) => {
        setUserData(res[0]);
        setIsAuth(true);
      });
      setIsAuth(true);
      if (user.aud === "authenticated") {
        setValidated(true);
      }
    }
  }, [user]);
  // set a short timeout on it so it doesn't run on every render
  useEffect(() => {
    startSession();
  }, []);

  // handle the login. if not undefined set the user
  useEffect(() => {
    if (session != undefined) {
      setUser(session.user);
      setSession(session);
    }
  }, [session]);

  // when there is a user get the users data, and set authenticated to true
  useEffect(() => {
    if (user) {
      setIsAuth(true);
    }
  }, [user]);


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        userData,
        setUserData,
        setSession,
        session,
        validated,
        userLocation,
        setUserLocation,
        slug,
        setSlug,
        redirectBackToClaimPoints,
        setRedirectBackToClaimPoints
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
