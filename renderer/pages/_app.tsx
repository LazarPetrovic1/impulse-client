"use client";
// const TopContainer = styled.div`
//   position: fixed;
//   height: 78px;
//   top: 0;
//   left: 0;
//   right: 0;
//   z-index: 300;
// `;

import Head from "next/head";
import favicon from '../public/images/logo.png';
import { QueryClientProvider } from "@tanstack/react-query";
import { api, queryClient } from "../lib/api";
import '../styles/globals.css'
import { ThemeProvider } from "styled-components";
import { GlobalStyles, themes } from "../styles";
import { AppLayout } from "../components/layout";
import { useAuth } from "../features/auth/hooks";
import { useEffect } from "react";
import { useThemeStore } from "../features/themes";
import { useFont } from "../features/font";
import { useAuthStore } from "../features/auth/store";
import { useFriendRequestSocketListener, useFriends } from "../features/friend";
import { useNotificationSocket } from "../features/notifications/hooks";

function App({ Component, pageProps }) {
  const { restoreSession } = useAuth();
  const { user } = useAuthStore()
  const { font, fontSize, hydrated } = useFont();
  useEffect(() => {
    const init = async () => {
      try { await api.post('/auth/refresh'); }
      catch {}
      try { await restoreSession(); }
      catch {}
    };

    init();
  }, []);
  const themeName = useThemeStore((s) => s.theme);
  const theme = themes[themeName];
  useFriends(user?.id)
  useFriendRequestSocketListener(user?.id);
  useNotificationSocket()
  if (!hydrated) return null;
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="Impulse" />
        <meta property="og:description" content="Make an impact. Change minds." />
        <meta property="og:image" content={favicon.src} />
        <meta
          name="description"
          content="Welcome to Impulse - make an impact, change minds. Impulse is dedicated to your enjoyment and pleasure!"
        />
        <title>Impulse</title>
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles $font={font} $fontSize={fontSize} theme={theme} />
          <AppLayout>
            <Component { ...pageProps } />
          </AppLayout>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default App