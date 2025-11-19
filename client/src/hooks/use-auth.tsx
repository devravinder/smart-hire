import { createClient, type EmailOtpType, type Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ref: https://supabase.com/docs/guides/auth/quickstarts/react
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);


type AuthProps = {
  children: ReactNode;
};

type AuthState = {
    loading: boolean;
    session: Session | null;
    verifying: boolean;
    authError: string | null;
    authSuccess: boolean;
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    loginWithGoogle: ()=> Promise<void>
}

const initialState:AuthState = {
  loading:false,
  session: null,
  verifying: false,
  authError: null,
  authSuccess: false,
  login:async()=>{},
  logout:async()=>{},
  loginWithGoogle:async()=>{}

};

const AuthContext = createContext<AuthState>(initialState);



export default function AuthProvider({children}:AuthProps) {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session|null>(null);

  // Check URL params on initial render
  const params = new URLSearchParams(window.location.search);
  const hasTokenHash = params.get("token_hash");

  const [verifying, setVerifying] = useState(!!hasTokenHash);
  const [authError, setAuthError] = useState<string|null>(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  const login = async (email: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) setAuthError((error as unknown as {error_description: string}).error_description || error.message);

    setAuthError(null)
    setLoading(false);
  };

  const loginWithGoogle=async()=>{
      await supabase.auth.signInWithOAuth({
  provider:'google',
  options: {
    redirectTo: `${window.location.origin}/` 
    //redirectTo: import.meta.env.VITE_SUPABASE_GOOGLE_AUTH_REDIRECT_URL,
    // both are working
  },
}) 
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };


  useEffect(() => {
          // Check if we have token_hash in URL (magic link callback)
          const params = new URLSearchParams(window.location.search);
          const token_hash = params.get("token_hash");
          const type = params.get("type") as EmailOtpType;
  
          if (token_hash) {
              // Verify the OTP token
              supabase.auth.verifyOtp({
                  token_hash,
                  type: type || "email",
              }).then(({ error }) => {
                  if (error) {
                      setAuthError(error.message);
                  } else {
                      setAuthSuccess(true);
                      window.history.replaceState({}, document.title, "/");
                  }
                  setVerifying(false);
              });
          }
  
          // Check for existing session
          supabase.auth.getSession().then(({ data: { session } }) => {
              setSession(session);
          });
  
          // Listen for auth changes
          const {
              data: { subscription },
          } = supabase.auth.onAuthStateChange((_event, session) => {
              setSession(session);
          });
  
          return () => subscription.unsubscribe();
      }, []);

    const value = {loading, login, logout, session, verifying, authError, authSuccess, loginWithGoogle}
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
};