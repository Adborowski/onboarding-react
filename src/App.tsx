import styles from './App.module.scss'
import './globals.css'
import { useState, useEffect } from 'react'
// import Question from './components/question/question'
import QuestionList from './components/question/question'
import TestControls from './components/test-controls/test-controls'
import ColorPicker from './components/color-picker/color-picker'

// each time the app is re-rendered, a random AB Test config id is chosen, out of three:
// conf_a - has question descriptions. See 'question-description.tsx' for a list of descriptions (not all questions have one for this test)
// conf_b - only shows the first 3 questions
// conf_c - changes the layout and styling of all questions

const App = () => {
   const [questionsData, setQuestionsData] = useState<[]>()
   const [testId, setTestId] = useState<string>('conf_default')

   const getTestId = () => {
      const testIds = ['conf_a', 'conf_b', 'conf_c', 'conf_default']
      const randomId = Math.floor(Math.random() * testIds.length)
      return testIds[randomId]
   }

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
      setTestId(getTestId)
   }, [questionsData])

   return (
      <div className={`${styles.main} ${styles[testId]}`}>
         <TestControls setTestId={setTestId} testId={testId} />
         <h1>markets.com</h1>
         <h2>{testId}</h2>
         <QuestionList questionsData={questionsData} testId={testId} />
      </div>
   )
}

export default App
