// LanguageContext.js
import { I18n } from "i18n-js";
import { translations } from "../assets/i18n/localization";
import React, { createContext } from "react";
const I18nContext = createContext();

const I18nProvider = ({ children }) => {
  const i18n = new I18n(translations);
  function setLanguage(lang) {
    i18n.locale = lang;
  }
  return (
    <I18nContext.Provider value={{ i18n, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export { I18nContext, I18nProvider };
