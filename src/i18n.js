import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from "./locales/eng.json";
import uzLang from "./locales/uz.json";

const resources = {
  en: {
    translation: enLang,
  },
  uz: {
    translation: uzLang,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uz",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
