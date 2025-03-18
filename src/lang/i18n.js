import i18n from "i18next";
import en from './en.json'
import ar from './ar.json'
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs: ["en", "ar"],
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    detection: {
        order: ['path', 'localStorage', 'navigator', ''],
        lookupFromPathIndex: 0, 
        htmlTag: document.documentElement,
        caches: ['localStorage'],
        excludeCacheFor: ['cimode'],
    },
});

i18n.on("languageChanged", (lng) => {
    document.dir = lng === "ar" ? "rtl" : "ltr";
});
  
export default i18n;