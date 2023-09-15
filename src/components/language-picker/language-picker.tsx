import { useContext } from 'react'
import LanguageContext from '../../context/LanguageContext'

const LanguagePicker = () => {
   const { language, setLanguage } = useContext(LanguageContext)
   console.log(language)

   return (
      <div>
         <span>Language</span>
         <button
            onClick={() => {
               setLanguage('en')
            }}
         >
            EN
         </button>
         <button
            onClick={() => {
               setLanguage('pl')
            }}
         >
            PL
         </button>
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
