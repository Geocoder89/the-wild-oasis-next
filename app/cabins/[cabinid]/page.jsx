import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { getCabin, getCabins } from "../../_lib/data-service";
import Cabin from "../../_components/Cabin";

import Reservation from "../../_components/Reservation";
import { Suspense } from "react";
import Spinner from "../../_components/Spinner";

// this is done to dynamically get back dynamic metadata using the inbuilt param prop.
export const generateMetadata = async({params})=>{
  const  {name} = await getCabin(params.cabinid)
  return {
    title: `Cabin ${name}`
  }
}

// to generate a finite number of values coming from a dynamic route in a static pre-rendered manner, this can be done to optimize performance.
export const generateStaticParams = async ()=>{
  const cabins = await getCabins()

  const ids = cabins.map((cabin)=>({
    cabinId: cabin.id
  }))
  return ids
}


const Page = async ({params})=>{
  const {cabinid} = params
  const cabin = await getCabin(cabinid)
  
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

    




  return (
    <div className="max-w-6xl mx-auto mt-8">
     <Cabin cabin={cabin}/>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>
      <Suspense fallback={<Spinner/>}>
      
      <Reservation cabin={cabin}/>
      </Suspense>
    </div>
  );
}

export default Page