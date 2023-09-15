interface QuestionProps {
   group_id: string
   title: string
}

const Question = (props: QuestionProps) => {
   console.log(props)
}

export default Question
