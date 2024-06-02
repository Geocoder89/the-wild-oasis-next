import React from 'react'

import { getBooking,getCabin} from '../../../../_lib/data-service'
import { updateReservation } from '../../../../_lib/actions'
import SubmitButton from '../../../../_components/SubmitButton'
const page = async ({params}) => {

  // get the bookingId from the params object available on the component
  const {bookingId} = params

  // get the number of guests, observations and cabins from the bookingg

  const {numGuests, observations, cabinId} = await getBooking(bookingId)

  const {maxCapacity} = await getCabin(cabinId)


 



  




  

  


  


  


//  const cabin = 
  

// if(!guestBookingIds.includes(bookingId))throw new Error('You are not allowed to edit this booking')
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form action={updateReservation} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
      <input type="hidden" name="bookingId" value={bookingId}/>
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
         <SubmitButton pendingLabel='Updating'>
         Update reservation
         </SubmitButton>
        </div>
      </form>
    </div>
  )
}

export default page