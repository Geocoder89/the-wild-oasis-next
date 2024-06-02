'use client'
import { createContext,useContext,useState } from 'react';

// create the context before creating the component that exposes this context to other components

const ReservationContext = createContext()
const initialState = {
  from: undefined,
  to: undefined
}

const ReservationProvider = ({children})=> {
  const [range, setRange] = useState(initialState)
  const resetRange = ()=> setRange(initialState)
  return <ReservationContext.Provider value={
    {range,setRange, resetRange}
  }>{children}</ReservationContext.Provider>
}

const useReservation = ()=>{
  const context = useContext(ReservationContext)

  if(context === undefined) throw new Error('Context was used outside provider')
    return context
}


export {ReservationProvider, useReservation}
