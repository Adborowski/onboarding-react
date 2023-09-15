import styles from './App.module.scss'
import './globals.css'
import { useState, useEffect, useContext, createContext } from 'react'
import { QuestionList } from './components/question/question'
import TestControls from './components/test-controls/test-controls'
import ColorPicker from './components/color-picker/color-picker'

// @ts-ignore
import ColorContext from './context/ColorContext.tsx'

// each time the app is re-rendered, a random AB Test config id is chosen, out of three:
// conf_a - has question descriptions. See 'question-description.tsx' for a list of descriptions (not all questions have one for this test)
// conf_b - only shows the first 3 questions
// conf_c - changes the layout and styling of all questions

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
   const start = index
   const deleteCount = 0
   let newQuestionsData

   if (questionsData.filter((q: any) => q.title === questionToInject.title).length == 0) {
      newQuestionsData = questionsData
      newQuestionsData.splice(start, deleteCount, questionToInject)
      return newQuestionsData
   }

   console.log('Injection failed.')
   return questionsData
}

const App = () => {
   const [questionsData, setQuestionsData] = useState<any[]>()
   const [originalQuestionsData, setOriginalQuestionsData] = useState<any[]>()
   const [testId, setTestId] = useState<string>('conf_default')

   // default background color (for messing around with the color picker)
   const [color, setColor] = useState('#ffffff')
   const value = { color, setColor }

   // we fetch safecap questions from a JSON to have a base of dummy questions
   // they get dummy answers added in the frontend, in question.tsx

   useEffect(() => {
      console.log('%cREDRAW', 'color: pink')
      resetData()
   }, [])

   useEffect(() => {
      console.log('%cnew questionsData', 'color: lime', questionsData)
   }, [questionsData])

   useEffect(() => {
      console.log('%cNew testId', 'color: orange', testId)
      processQuestionsData(testId)
   }, [testId])

   const resetData = async function () {
      console.log('resetting data...')
      fetch(`safecap.json`)
         .then((r) => r.json())
         .then((data) => {
            if (data) {
               setQuestionsData(data)
               setOriginalQuestionsData(data)
            }
         })
   }

   const processQuestionsData = (testId: string) => {
      // conf_b limits the number of questions shown to 3
      if (testId == 'conf_b' && questionsData && originalQuestionsData) {
         let newQuestionsData: any[]

         newQuestionsData = originalQuestionsData.filter((q: any, index: any) => {
            if (index < 3) {
               return q
            }
         })

         setQuestionsData(newQuestionsData)
         return
      }

      // conf_d adds a color picker question in index 2 of question list
      if (testId == 'conf_d' && questionsData) {
         let newQuestionsData: any[] = questionsData.slice() // clone by value
         const newQuestion = createComponentQuestion(<ColorPicker />, 'Color Picker')
         newQuestionsData = injectQuestion(newQuestionsData, newQuestion, 2)
         setQuestionsData(newQuestionsData)
         return
      }

      // if statements contain RETURN, so if the function got here, just show raw data
      resetData()
   }

   return (
      //@ts-ignore
      <ColorContext.Provider value={value}>
         <div style={{ backgroundColor: color }} className={`${styles.main} ${styles[testId]}`}>
            <TestControls setTestId={setTestId} testId={testId} />
            <h1>markets.com</h1>
            <h2>{testId}</h2>
            <QuestionList questionsData={questionsData} testId={testId} />
            {/* {questionsData?.length} */}
         </div>
      </ColorContext.Provider>
   )
}

export default App
