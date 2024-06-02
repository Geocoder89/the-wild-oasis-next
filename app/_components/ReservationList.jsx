'use client'
import {useOptimistic} from 'react'

import ReservationCard from './ReservationCard'
import { deleteReservation } from '../_lib/actions'
const ReservationList = ({bookings}) => {

 

  // this is the use optimistic hook it takes in 2 parameters the current state and a updating function which takes in the initial state and a parameter we want to use to alter/compute the state, to generate new state...it returns the optimistic value and a setter function similar to the useState hook.
 const [optimisticBookings, optimisticDeleteFunction] = useOptimistic(bookings,(currentBookings,bookingId)=>{
  return currentBookings.filter((booking)=> booking.id !== bookingId)
 }) // initial state, updating function



 const handleDelete = async (bookingId)=> {
  optimisticDeleteFunction(bookingId)
  await deleteReservation(bookingId)
 }


  return (
    <ul className="space-y-6">
    {optimisticBookings.map((booking) => (
      <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete} />
    ))}
  </ul>
  )
}

export default ReservationList