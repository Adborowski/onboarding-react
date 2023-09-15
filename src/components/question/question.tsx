import styles from './question.module.scss'

interface Question {
   group_id: string
   title: string
}

const Question = (props: any) => {
   const question: Question = props.question
   const testId = { props }

   const answers = [
      { label: 'Answer A', value: 'a', inputType: 'radio' },
      { label: 'Answer B', value: 'a', inputType: 'radio' },
      { label: 'Answer C', value: 'a', inputType: 'radio' },
      { label: 'Answer D', value: 'a', inputType: 'text' },
   ]

   return (
      <div className={styles.question}>
         aa
         {answers.map((ans) => {
            return (
               <section className={styles.answer}>
                  {ans.label}
                  <input name={question.title} type={ans.inputType} />
               </section>
            )
         })}
      </div>
   )
}

export default Question
