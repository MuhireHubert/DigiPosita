"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onIdTokenChanged, type User } from "firebase/auth";
import { auth, configured } from "@/lib/firebase";
const Context = createContext<{
  user: User | null;
  loading: boolean;
  staff: boolean;
}>({ user: null, loading: true, staff: false });
export function useAuth() {
  return useContext(Context);
}
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState({
    user: null as User | null,
    loading: true,
    staff: false,
  });
  useEffect(() => {
    if (!configured) {
      setState({ user: null, loading: false, staff: false });
      return;
    }
    let active = true;
    const stop = onIdTokenChanged(
      auth,
      async (user) => {
        try {
          const token = user ? await user.getIdTokenResult() : null;
          if (active && auth.currentUser === user)
            setState({
              user,
              loading: false,
              staff: token?.claims.staff === true,
            });
        } catch {
          if (active) setState({ user: null, loading: false, staff: false });
        }
      },
      () => setState({ user: null, loading: false, staff: false }),
    );
    return () => {
      active = false;
      stop();
    };
  }, []);
  return <Context.Provider value={state}>{children}</Context.Provider>;
}
