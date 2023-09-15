import { createContext } from 'react'

const LanguageContext = createContext({
   language: 'en',
   // @ts-ignore
   setLanguage: (language: string) => {},
})

export default LanguageContext
