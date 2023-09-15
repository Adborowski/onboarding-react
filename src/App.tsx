import styles from './App.module.scss'
import './globals.css'
import { useState, useEffect } from 'react'
import Question from './components/question/question'

const getTestId = () => {
   const testIds = ['conf_a', 'conf_b', 'conf_c']
   const randomId = Math.floor(Math.random() * 10)
   console.log(randomId)
}

const App = () => {
   const [questionsData, setQuestionsData] = useState<[]>()

   useEffect(() => {
      fetch(`safecap.json`)
         .then((r) => r.json())
         .then((data) => {
            if (data) {
               setQuestionsData(data)
            }
         })
   }, [])

   useEffect(() => {
      console.log('questionsData', questionsData)
   }, [questionsData])

   return (
      <>
         <h1>markets.com</h1>
         {questionsData &&
            questionsData.map((q: any) => {
               return <Question question={q} testId={getTestId()} />
            })}
      </>
   )
}

export default App
