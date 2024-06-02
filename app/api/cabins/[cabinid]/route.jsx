import { getBookedDatesByCabinId, getCabin } from "../../../_lib/data-service";

export const GET = async(request,{
  params
})=>{
  const {cabinid} = params;
  try {
    
    const [cabin, bookedDates] = await Promise.all([getCabin(cabinid), getBookedDatesByCabinId(cabinid)])
    return Response.json({
      cabin,bookedDates
    })
  } catch  {
    return Response.json({
      messsage: 'Cabin not found'
    })
  }


}