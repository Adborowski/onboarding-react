import { useContext } from 'react'
// @ts-ignore
import ColorContext from '../../context/ColorContext.tsx'

const ColorPicker = () => {
   // @ts-ignore
   const { color, setColor } = useContext(ColorContext)

   const handleChange = (e: any) => {
      setColor(e.target.value)
   }
   return (
      <div>
         <input onChange={handleChange} type="color" />
      </div>
   )
}

export default ColorPicker
