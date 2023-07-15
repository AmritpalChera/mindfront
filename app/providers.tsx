"use client";

import { ThemeProvider } from "next-themes";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";



export function Providers({ children }: any) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Provider store={store}>
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
              {children}
          </ThemeProvider>
        </Provider>
    </SessionContextProvider>
    
  );
}
