import styles from './App.module.scss'
import './globals.css'
import { useState, useEffect } from 'react'
// import Question from './components/question/question'
import QuestionList from './components/question/question'

const getTestId = () => {
   const testIds = ['conf_a', 'conf_b', 'conf_c', 'conf_default']
   const randomId = Math.floor(Math.random() * testIds.length)
   return testIds[randomId]
}

// each time the app is re-rendered, a random AB Test config id is chosen, out of three:
// conf_a - has question descriptions. See 'question-description.tsx' for a list of descriptions (not all questions have one for this test)
// conf_b - only shows the first 3 questions
// conf_c - changes the layout and styling of all questions

const App = () => {
   const [questionsData, setQuestionsData] = useState<[]>()

   // we fetch safecap questions from a JSON to have a base of dummy questions
   // they get dummy answers added in the frontend, in question.tsx
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

   // pick a random testId
   const testId = getTestId()

   // this is just for understanding of the test runner
   const testDescriptions: any = {
      conf_a: 'has question descriptions on some questions',
      conf_b: 'only shows first 3 questions',
      conf_c: 'has alternate styling',
      conf_default: 'no changes',
   }

   return (
      <div className={`${styles.main} ${styles[testId]}`}>
         <h1>markets.com</h1>
         <h2>{testId}</h2>
         <h3>{testDescriptions[testId]}</h3>
         <QuestionList questionsData={questionsData} testId={testId} />
      </div>
   )
}

export default App
