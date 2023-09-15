import { useContext } from 'react'
import LanguageContext from '../context/LanguageContext'

interface Translation {
   [key: string]: string
}

interface Translations {
   [key: string]: Translation
}

const translate = (key: string, fallback?: string) => {
   const { language } = useContext(LanguageContext)
   const translations: Translations = {
      trade_kind: {
         en: 'What kind of trade are you most engaged in?',
         pl: 'Jaki typ inwestycji cię interesuje?',
      },
      trading_frequency_feb2022: {
         en: 'How frequently have you traded in the last 12 months?',
         pl: 'Jak często handlowałeś w ciągu ostatnich 12 miesięcy?',
      },
      trading_purpose: {
         en: 'What is the purpose of your trading?',
         pl: 'Jaki jest cel twojego handlowania?',
      },
   }

   let translation
   const keyTranslations = translations[key]
   if (keyTranslations) {
      translation = keyTranslations[language]
   }

   if (translation) {
      return translation
   } else {
      return fallback ?? key
   }
}

export default translate
