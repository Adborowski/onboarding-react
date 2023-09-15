import styles from './question.module.scss'
import QuestionDescription from './question-description'
import translate from '../../util/translate'

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
   answers?: []
}

export const Question = (props: any) => {
   const question: Question = props.question
   const testId = props.testId
   let answers = props.question.answers

   const fakeAnswers = [
      { text: 'Answer A', value: 'a', input_type: 'radio' },
      { text: 'Answer B', value: 'a', input_type: 'radio' },
      { text: 'Answer C', value: 'a', input_type: 'radio' },
      { text: 'Other', value: 'a', input_type: 'text' },
   ]

   answers = answers ?? fakeAnswers

   return (
      <div className={`${styles.question} ${styles[testId]}`}>
         <span className={styles.title}>{translate(question.title)}</span>

         {/* only in conf_a, we show Question Descriptions */}
         {testId == 'conf_a' && <QuestionDescription questionTitle={question.title} />}

         {/* a question will only render answers if it holds no component */}
         {!question.component &&
            answers.map((ans: any) => {
               return (
                  <section key={question.title + ans.text} className={styles.answer}>
                     <span>{ans.text}</span>
                     <input name={question.title} type={ans.input_type} />
                  </section>
               )
            })}

         {/* if there is a component, render the component instead of answers */}
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
