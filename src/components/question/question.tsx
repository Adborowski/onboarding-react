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

export const Question = (props: any) => {
   const question: Question = props.question
   const testId = props.testId

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

         {/* only render answers if a question does not hold a component */}
         {!question.component &&
            answers.map((ans) => {
               return (
                  <section key={question.title + ans.label} className={styles.answer}>
                     <span>{ans.label}</span>
                     <input name={question.title} type={ans.inputType} />
                  </section>
               )
            })}

         {question.component && question.component}
      </div>
   )
}

export const QuestionList = (props: any) => {
   console.log('QuestionList received questionsData', props.questionsData)
   let questionsData = props.questionsData
   const testId = props.testId

   if (questionsData) {
      console.log(questionsData)

      let questionElements = questionsData.map((q: any) => {
         return <Question key={q.group_id + q.title} question={q} testId={testId} />
      })

      return <div className={`${styles.questionsList} ${styles[testId]}`}>{questionElements}</div>
   }
}
