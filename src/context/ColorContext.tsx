import { createContext } from 'react'

const ColorContext = createContext({
   color: '#ff0000',
   // @ts-ignore
   setColor: (color: string) => {},
})

export default ColorContext
