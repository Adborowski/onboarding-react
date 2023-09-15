import { createContext } from 'react'

const ColorContext = createContext({
   color: '#ff0000',
   setColor: (color: string) => {},
})

export default ColorContext
