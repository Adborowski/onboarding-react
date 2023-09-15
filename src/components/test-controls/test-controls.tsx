import styles from './test-controls.module.scss'

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

   const testIds = Object.keys(testDescriptions)

   return (
      <div className={styles.testControls}>
         <h1>Available AB Tests</h1>
         <h2>Refresh page to randomize test</h2>
         <h3>
            {testId} - {testDescriptions[testId]}
         </h3>
         {testIds.map((testId) => {
            return (
               <button
                  key={testId}
                  onClick={() => {
                     setTestId(testId)
                  }}
               >
                  {testId}
               </button>
            )
         })}
      </div>
   )
}

export default TestControls
