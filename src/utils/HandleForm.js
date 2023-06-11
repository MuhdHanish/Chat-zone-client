import { useState } from "react"

const HandleForm = (initialState) =>{
 const [state, setState] = useState(initialState);
 const handleInput = (event) =>{
  setState({
   ...state,
   [event.target.name] : event.target.value
  })
 }
 return [state,handleInput]
}

export default HandleForm ;