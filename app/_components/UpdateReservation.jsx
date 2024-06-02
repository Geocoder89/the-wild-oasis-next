
'use client'
import {React} from 'react'
import {useFormStatus} from 'react-dom'
import { updateReservation } from '../_lib/actions';

const UpdateReservation = ({reservation,maxCapacity}) => {
 // CHANGE
  // const reservationId = 23;
  // const maxCapacity = 23;



  const {id,numGuests,observations} = reservation


  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{id}
      </h2>

      <form action={updateReservation} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
      <input type="hidden" name="bookingId" value={id}/>
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
         <Button/>
        </div>
      </form>
    </div>
  );
}

const Button = ()=> {
  const {pending} = useFormStatus()

  return (
    <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    disabled={pending}
    >
    {pending ? 'Updating' : 'Update reservation'}
  </button>
  )
}

export default UpdateReservation