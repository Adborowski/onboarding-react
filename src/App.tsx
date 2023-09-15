import styles from './App.module.scss'
import './globals.css'
import { useState, useEffect } from 'react'

const App = () => {
   const [questionsData, setQuestionsData] = useState<[]>()
   useEffect(() => {
      fetch(`safecap.json`)
         .then((r) => r.json())
         .then((data) => {
            if (data) {
               console.log('Q', data)
               setQuestionsData(questionsData)
            }
         })
   }, [])

   return (
      <>
         <h1>markets.com</h1>
         {questionsData &&
            questionsData.map(() => {
               return <p>a</p>
            })}
      </>
   )
}

export default App
