import styles from './question.module.scss'
import QuestionDescription from './question-description'
import ColorPicker from '../color-picker/color-picker'
import { useEffect, useState } from 'react'

interface Question {
   group_id: string
   group_title: string
   title: string
   subtitle: string
   continue: boolean
   confirm: boolean
   full_page: boolean
   previous: boolean
   image: string
   steps: string[]
   component: any
}

// component questions have some dummy data so the renderer will accept them
// but also a 'component' prop which contains a component
// that component actually gets displayed instead of a question
const createComponentQuestion = (component: any) => {
   // this is dummy data so the renderer thinks it's a 'real' question
   const newQuestion: Question = {
      group_id: 'component_question',
      group_title: '',
      title: 'Comp',
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

// injects a new question into an existing questionsData
const injectQuestions = (questionsData: any, questionToInject: Question, index: number) => {
   console.log({
      questionsData: questionsData,
      questionToInject: questionToInject,
      index: index,
   })

   const start = index
   const deleteCount = 0
   questionsData = questionsData.splice(start, deleteCount, questionToInject)

   return questionsData
}

const Question = (props: any) => {
   const question: Question = props.question
   const testId = props.testId

   useEffect(() => {
      console.log('new testId', testId)
   }, [testId])

   const answers = [
      { label: 'Answer A', value: 'a', inputType: 'radio' },
      { label: 'Answer B', value: 'a', inputType: 'radio' },
      { label: 'Answer C', value: 'a', inputType: 'radio' },
      { label: 'Other', value: 'a', inputType: 'text' },
   ]
   return (
      <div className={`${styles.question} ${styles[testId]}`}>
         <span className={styles.title}>{question.title}</span>

         {/* only in conf_a, we show Question Descriptions */}
         {testId == 'conf_a' && <QuestionDescription questionTitle={question.title} />}

         {answers.map((ans) => {
            return (
               <section className={styles.answer}>
                  <span>{ans.label}</span>
                  <input name={question.title} type={ans.inputType} />
               </section>
            )
         })}
      </div>
   )
}

const QuestionList = (props: any) => {
   //  let [questionsData, setQuestionsData] = useState<any>()
   const questionsData = props.questionsData

   useEffect(() => {
      console.log('NEW', questionsData)
   }, [questionsData])

   //  useEffect(() => {
   //     console.log('START', props)
   //     setQuestionsData(props.questionsData)
   //  }, [])

   //  let questionsData = props.questionsData
   const testId = props.testId

   if (questionsData) {
      // we can write special cases for AB tests which filter or map the questionsData into something else
      // in here, we satisfy the conf_b requirement of 'first three questions only' by using filtering

      if (testId == 'conf_b') {
         let maximumQuestions = 3 // how many questions to render
         let newQuestionsData = questionsData.filter((question: any, index: any) => {
            if (index < maximumQuestions) {
               return question
            }
         })

         //  setQuestionsData(newQuestionsData)
      }

      // conf_d adds a color picker question in index 2 of question list
      // if (testId == 'conf_d') {
      //    const newQuestion = createComponentQuestion(<ColorPicker />)
      //    questionsData = injectQuestions(questionsData, newQuestion, 2)
      // }

      let questionElements = questionsData.map((q: any) => {
         return <Question question={q} testId={testId} />
      })

      return <div className={`${styles.questionsList} ${styles[testId]}`}>{questionElements}</div>
   }
}

export default QuestionList
