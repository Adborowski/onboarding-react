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

   // component questions have some dummy data so the renderer will accept them
   // but also a 'component' prop which contains a component
   // that component actually gets displayed instead of a question
   const createComponentQuestion = (component: any, title: string) => {
      // this is dummy data so the renderer thinks it's a 'real' question
      const newQuestion: any = {
         group_id: 'component_question',
         group_title: '',
         title: title,
         subtitle: 'aaa',
         continue: false,
         confirm: false,
         full_page: true,
         previous: false,
         image: 'images/icons/clock.webp',
         steps: ['trade_kind'],
         component: component,
      }
      return newQuestion
   }

   // injects a new question into an existing questionsData, returns questionsData
   const injectQuestion = (questionsData: any, questionToInject: any, index: number) => {
      console.log({
         questionsData: questionsData,
         questionToInject: questionToInject,
         index: index,
      })

      const start = index
      const deleteCount = 0

      if (questionsData.filter((q: any) => q.title === questionToInject.title).length > 0) {
         // question with that title is already present in questionsData
         // this is for duplicate prevention
      } else {
         // question is new, so add it
         questionsData.splice(start, deleteCount, questionToInject)
      }

      console.log('POST INJECTION', questionsData)
      console.log()

      return questionsData
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

   useEffect(() => {
      console.log('NEW TEST ID', testId)
      const processedData = processQuestionsData(testId, questionsData)
      console.log('PROCESSED', processedData)
      setQuestionsData(processedData)
   }, [testId])

   const processQuestionsData = (testId: string, questionsData: any) => {
      console.log('%cProcessing...', 'color: yellow', questionsData)
      // // conf_d adds a color picker question in index 2 of question list
      if (testId == 'conf_d' && questionsData) {
         console.log('%cconf_d', 'color: red')
         const newQuestion = createComponentQuestion(<ColorPicker />, 'Color Picker')
         const isAlreadyPresent = questionsData.filter((q: any) => {
            return q.title == newQuestion.title
         })

         if (isAlreadyPresent.length == 0) {
            console.log(newQuestion.title, 'is NOT present')
            const newQuestionsData = injectQuestion(questionsData, newQuestion, 2)
            console.log('NEW!', newQuestionsData)
            return newQuestionsData
         }
      }

      return questionsData
   }

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
