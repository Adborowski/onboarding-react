import styles from './question.module.scss'

const QuestionDescription = (props: any) => {
   const questionDescriptions: any = {
      trading_frequency_feb2022:
         'For compliance, we need to measure the frequency in which you trade.',
      EXPERIENCE:
         'To evaluate whether you fit our target market, we want to know about your trading experience.',
      education_level:
         'To evaluate whether you are fit to trade, we need to know your education level.',
   }

   const { questionTitle } = props

   if (questionDescriptions[questionTitle]) {
      return <p className={styles.description}>{questionDescriptions[questionTitle]}</p>
   }
}

export default QuestionDescription
