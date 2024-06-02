"use server"
import { revalidatePath } from "next/cache"
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase"
import { getBookings } from "./data-service"
import { redirect } from "next/navigation"

export const createReservation = async (bookingData,formData)=>{
  const session = await auth()
  if(!session) throw new Error('You must be logged in')
    // cheat code for huge Objects

  // Object.entries(formData.entries)

    const newReservation = {
      ...bookingData,
      guestId: session.user.guestId,
      numGuests: +formData.get('numGuests'),
      observations: formData.get('observations').slice(0,1000),
      extrasPrice: 0,
      totalPrice: bookingData.cabinPrice,
      isPaid: false,
      hasBreakfast: false,
      status: 'unconfirmed'
    }


    const {error } = await supabase
    .from('bookings')
    .insert([newReservation])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`)
  redirect('/cabins/thankyou')

}
export const updateReservation = async (formData)=>{
   // get the booking id from the formData object
   const bookingId = +formData.get('bookingId')
// authentication logic

const session = await auth()

// check if the user is authenticated, if not throw an error.
if(!session) throw new Error('You must be logged in')

 // authorization logic

const guestBookings = await getBookings(session.user.guestId)

const guestBookingIds = guestBookings.map((booking)=> booking.id)

if(!guestBookingIds.includes(bookingId)){
  throw new Error('You cannot edit this reservation')
}

// get the data to be updated from the formData

  const numGuests = +formData.get('numGuests')
  const observations = formData.get('observations').slice(0,1000)

  

  const updatedFields = {numGuests, observations}


  // the update function

  const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', bookingId)
    .select()
    .single();

    // error handling
  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  // revalidate the cache
  revalidatePath(`/account/reservations/edit/${bookingId}`)
  // redirect back to reservations
  redirect('/account/reservations')

}



export const updateProfile = async(formData)=>{
  // authentication and authorization

  const session = await auth()
  // if there is no session , the action cannot be carried out

  if(!session) throw new Error('You must be logged in')
    
    // we then get the data from the form action

    const nationalID = formData.get('nationalID')
    const [nationality, countryFlag] = formData.get('nationality').split('%')

    // validation of nationalID
    if( !/^[a-zA-Z0-9]{6,12}$/.test(nationalID)){
     throw new Error('Please provide a valid national ID')

    }

    const updatedData = {nationality,countryFlag,nationalID}

    const { data, error } = await supabase
    .from('guests')
    .update(updatedData)
    .eq('id', session.user.guestId)

  if (error) {
  
    throw new Error('Guest could not be updated');
  }

  revalidatePath('/account/profile')
  


}

export const deleteReservation = async(bookingId)=>{
  const session = await auth()
  if(!session) throw new Error('You must be logged in')


   

    // validate if the booking is for the actual user.

    const guestBookings = await getBookings(session.user.guestId)

    const guestBookingIds = guestBookings.map((booking)=> booking.id)

    if(!guestBookingIds.includes(bookingId))throw new Error('You are not allowed to delete this booking')

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
      console.error(error);
      throw new Error('Booking could not be deleted');

    }

    // revalidate path

    revalidatePath('/account/reservations')




  

}


export const signInAction = async()=>{
 await signIn('google', {
  redirectTo: '/account'
 })
}

export const signOutAction = async ()=> {
  await signOut({
    redirectTo: '/'
  })
}