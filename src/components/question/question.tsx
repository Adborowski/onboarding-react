import styles from './question.module.scss'
import QuestionDescription from './question-description'
import { useEffect } from 'react'
interface Question {
   group_id: string
   title: string
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
   let questionsData = props.questionsData
   const testId = props.testId

   if (questionsData) {
      console.log('A', questionsData)

      // we can write special cases for AB tests which filter or map the questionsData into something else
      // in here, we satisfy the conf_b requirement of 'first three questions only' by using filtering
      if (testId == 'conf_b') {
         let maximumQuestions = 3 // how many questions to render
         questionsData = questionsData.filter((question: any, index: any) => {
            if (index < maximumQuestions) {
               return question
            }
         })
      }

      let questionElements = questionsData.map((q: any) => {
         return <Question question={q} testId={testId} />
      })

      return <div className={`${styles.questionsList} ${styles[testId]}`}>{questionElements}</div>
   }
}

export default QuestionList
