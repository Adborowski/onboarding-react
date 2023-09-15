import { useContext } from 'react'
import LanguageContext from '../../context/LanguageContext'
import styles from './language-picker.module.scss'

const LanguagePicker = () => {
   const { language, setLanguage } = useContext(LanguageContext)
   console.log(language)

   const availableLanguages = ['en', 'pl']

   return (
      <div className={styles.languagePicker}>
         {availableLanguages.map((lang) => {
            // for indicating the active language
            let activeClass = ''
            if (lang == language) {
               activeClass = styles.active
            }

            return (
               <button
                  className={activeClass}
                  key={lang}
                  onClick={() => {
                     setLanguage(lang)
                  }}
               >
                  {lang.toUpperCase()}
               </button>
            )
         })}
      </div>
   )
}

export default LanguagePicker

// import ColorContext from '../../context/ColorContext.tsx'

// const ColorPicker = () => {
//    // @ts-ignore

//    const handleChange = (e: any) => {
//       setColor(e.target.value)
//    }
