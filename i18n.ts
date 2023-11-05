import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  fallbackLocale: 'pt',
  messages: {
    pt: require('./src/locales/pt.json'),
    en: require('./src/locales/en.json'),
    es: require('./src/locales/es.json'),
  },
});

export default i18n;