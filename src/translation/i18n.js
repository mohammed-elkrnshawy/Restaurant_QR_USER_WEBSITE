import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { TRANSLATIONS_AR } from './arab/translations';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: TRANSLATIONS_AR,
      },
    },
  });

export default i18n;
