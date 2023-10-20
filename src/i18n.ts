import i18n from 'i18next';  
import { initReactI18next } from 'react-i18next';  
import en from './locales/en'; // 英文语言包  
import zh from './locales/zh'; // 中文语言包  

// 定义支持的语言列表  
const languages = ['en', 'zh'];
  
// 配置 i18next  
i18n.use(initReactI18next).init({  
  resources: {  
    en: { translation: en },  
    zh: { translation: zh },  
  },  
  fallbackLng: 'en', // 默认语言为英文  
  lng: 'en', // 初始化时选择的语言  
  keySeparator: false, // 不使用 keySeparator  
  interpolation: {  
    escapeValue: false, // 不对插值进行转义  
  },  
  react: {  
    useSuspense: false, // 不使用 Suspense  
  },  
});  
  
export default i18n;