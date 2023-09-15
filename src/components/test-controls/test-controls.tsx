import styles from './test-controls.module.scss'
import LanguagePicker from '../language-picker/language-picker'

const TestControls = (props: any) => {
   const { setTestId, testId } = props

   // this is just for understanding of the test runner
   const testDescriptions: any = {
      conf_a: 'has question descriptions on some questions',
      conf_b: 'only shows first 3 questions',
      conf_c: 'has alternate styling',
      conf_d: 'has a color picker between questions',
      conf_default: 'no changes',
   }

   const getRandomTest = () => {
      const randomIndex = Math.floor(Math.random() * testIds.length)
      setTestId(testIds[randomIndex])
   }

   const testIds = Object.keys(testDescriptions)

   return (
      <div className={styles.testControls}>
         <LanguagePicker />
         <h1>Available AB Tests</h1>
         <h2>
            {testId} - {testDescriptions[testId]}
         </h2>
         <button onClick={getRandomTest}>Randomize</button>
         {testIds.map((id) => {
            return (
               <button
                  key={id}
                  onClick={() => {
                     setTestId(id)
                  }}
               >
                  {id}
               </button>
            )
         })}
      </div>
   )
}

export default TestControls
