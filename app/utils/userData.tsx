"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./superBaseClient";
import { usePathname, useRouter } from "next/navigation";
import { Toast, User } from "../types/userProps";
import Toast_modal from "../components/generalComponent/toastModal";

type UserContextType = {
  user: User;
  toasts: Toast[]; // Array of toasts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setToasts: React.Dispatch<React.SetStateAction<any[]>>; // Correct type for setToasts
  loading: boolean;
  MAX_TOASTS: number;
  checkUser: () => Promise<void>; // Async function returning a Promise<void>
  // Update cart state
};
// Create the context
const UserContext = createContext<UserContextType>({
  user: { userId: "", name: "", email: "" },
  setToasts: () => {
    throw new Error("setUser function must be used within a UserProvider");
  },
  loading: true,
  toasts: [],
  MAX_TOASTS: 0,
  checkUser: async () => {
    throw new Error("checkUser function must be used within a UserProvider");
  },
});

// Create a provider component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({ userId: "", name: "", email: "" }); // Holds user data (e.g., userId, name)
  const [loading, setLoading] = useState(true); // Tracks whether the check is complete
  const [toasts, setToasts] = useState<Toast[]>([]); // Array to manage multiple toasts

  const MAX_TOASTS = 2; // Maximum number of toasts

  // function to remove toast notifications
  // function to remove toast notifications
  // function to remove toast notifications
  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };
  const router = useRouter();
  const pathname = usePathname();
  const checkUser = async () => {
    console.log("use just started fetching");
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data }: any = await supabase.auth.getSession();
      const session_data = data.session?.user;
      // console.log(data);
      // console.log(session_data);
      if (session_data?.user_metadata) {
        console.log(session_data.id, "this is my seeson");
        setUser({
          name: session_data?.user_metadata.lastName,
          userId: session_data?.id,
          email: session_data?.email,
        });
      } else {
        router.push("https://cubby-fawn.vercel.app/login");
        setUser({ userId: "", name: "", email: "" });
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false); // Mark as finished
    }
  };
  // Check if the user is logged in
  useEffect(() => {
    checkUser();
  }, [router, pathname]);

  return (
    <UserContext.Provider
      value={{
        user,
        setToasts,
        MAX_TOASTS,
        toasts,
        loading,
        checkUser,
      }}
    >
      {children}
      {toasts.length > 0 && (
        <div className="fixed top-[4.5rem] right-0 space-y-2 z-[10001]">
          {toasts.map((toast) => (
            <Toast_modal
              key={toast.id}
              id={toast.id}
              message={toast.message}
              onClose={removeToast} // Pass the removeToast function
            />
          ))}
        </div>
      )}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const UserUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("userUserData must be used within a UserProvider");
  }
  return context;
};
