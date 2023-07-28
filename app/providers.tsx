"use client";

import { ThemeProvider } from "next-themes";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Startup from "./startup";
import 'react-toastify/dist/ReactToastify.css';


export function Providers({ children }: any) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Provider store={store}>
        <Startup>
          <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
                {children}
          </ThemeProvider>
        </Startup>
        </Provider>
    </SessionContextProvider>
    
  );
}
