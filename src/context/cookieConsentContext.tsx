import React, { createContext, useCallback, useContext, useState } from "react";
import { useEffect } from "react";

interface CookieConsentContextData {
  cookieConsent: boolean;
  setCookieConsent: (consent: boolean) => void;
  getCookieConsent: () => string | null;
}

interface Props {
  children: React.ReactNode;
}

const CookieConsentContext = createContext<CookieConsentContextData>(
  {} as CookieConsentContextData,
);

const CookieConsentProvider = ({ children }: Props) => {
  const [cookieConsent, setCookieConsentContext] = useState(false);

  const setCookieConsent = useCallback((consent: boolean) => {
    if (consent) {
      localStorage.setItem("cs50FP:cookieConsent", "true");
    } else {
      localStorage.setItem("cs50FP:cookieConsent", "false");
    }

    setCookieConsentContext(consent);
  }, []);

  const getCookieConsent = useCallback(() => {
    return localStorage.getItem("cs50FP:cookieConsent");
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      const hasConsent = localStorage.getItem("cs50FP:cookieConsent");

      if (hasConsent === "true") {
        setCookieConsent(true);
      }
    }
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        cookieConsent,
        setCookieConsent,
        getCookieConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

const useCookieConsent = (): CookieConsentContextData => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useContext must be used within an CookieConsentProvider");
  }

  return context;
};

export { CookieConsentProvider, useCookieConsent };
