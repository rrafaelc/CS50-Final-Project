import React from "react";

import { CookieConsentProvider } from "./cookieConsentContext";
import { DimensionProvider } from "./dimensionContext";
import { ModalStatusProvider } from "./modalStatusContext";
import { HeaderProvider } from "./headerContext";

interface Props {
  children: React.ReactNode;
}

// It's the Header component who set the width
export const AppProvider = ({ children }: Props) => {
  return (
    <CookieConsentProvider>
      <DimensionProvider>
        <ModalStatusProvider>
          <HeaderProvider>{children}</HeaderProvider>
        </ModalStatusProvider>
      </DimensionProvider>
    </CookieConsentProvider>
  );
};
