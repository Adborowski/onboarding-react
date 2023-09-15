import styles from './test-controls.module.scss'

const TestControls = (props: any) => {
   const { setTestId } = props

   // this is just for understanding of the test runner
   const testDescriptions: any = {
      conf_a: 'has question descriptions on some questions',
      conf_b: 'only shows first 3 questions',
      conf_c: 'has alternate styling',
      conf_default: 'no changes',
   }

   const testIds = Object.keys(testDescriptions)
   console.log(testIds)

   return (
      <div className={styles.testControls}>
         <h1>Available AB Tests</h1>
         <h2>Refresh page to randomize test</h2>
         {testIds.map((testId) => {
            return (
               <button
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
