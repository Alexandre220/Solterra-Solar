import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import {
  getUserProfile,
  getUserPreferences,
  saveUserPreference,
} from "../lib/api";
import type { UserProfile } from "../types/schema";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  preferences: any;
  isLoading: boolean;
  signOut: () => Promise<void>;
  updatePreference: (preference: string, value: any) => Promise<void>;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [preferences, setPreferences] = useState<any>(null);
  const [isDarkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Set to false initially to prevent loading state when Supabase isn't configured

  useEffect(() => {
    try {
      // Get initial session
      supabase.auth
        .getSession()
        .then(({ data: { session } }) => {
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            fetchUserProfile(session.user.id);
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error getting session:", error);
          setIsLoading(false);
        });

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error("Error in auth setup:", error);
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await getUserProfile(userId);
      if (error) throw error;
      setProfile(data);

      // Also fetch user preferences
      const { data: prefsData, error: prefsError } =
        await getUserPreferences(userId);
      if (prefsError && prefsError.code !== "PGRST116") {
        console.error("Error fetching user preferences:", prefsError);
      } else {
        setPreferences(prefsData || {});
        // Set dark mode from preferences
        if (prefsData?.dark_mode !== undefined) {
          setDarkMode(prefsData.dark_mode);
          applyDarkMode(prefsData.dark_mode);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyDarkMode = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const setIsDarkMode = async (isDark: boolean) => {
    setDarkMode(isDark);
    applyDarkMode(isDark);

    if (user) {
      try {
        await saveUserPreference(user.id, "dark_mode", isDark);
      } catch (error) {
        console.error("Error saving dark mode preference:", error);
      }
    }
  };

  const updatePreference = async (preference: string, value: any) => {
    if (!user) return;

    try {
      const { data, error } = await saveUserPreference(
        user.id,
        preference,
        value,
      );
      if (error) throw error;

      setPreferences((prev) => ({ ...prev, [preference]: value }));

      // If updating dark mode, also apply it
      if (preference === "dark_mode") {
        setDarkMode(value);
        applyDarkMode(value);
      }
    } catch (error) {
      console.error(`Error updating ${preference}:`, error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    session,
    user,
    profile,
    preferences,
    isLoading,
    signOut,
    updatePreference,
    isDarkMode,
    setIsDarkMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
