'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"


const Filter = () => {
  const searchParams = useSearchParams() // this helps with getting the search params
  const router = useRouter() // this helps with programmatic navigation.

  const pathname = usePathname()

  // logic to handle active navigation on the filter term.

  const activeFilter = searchParams.get('capacity') ?? 'all'
  const handleFilter = (filterTerm)=> {
    // use the webapi to get params using the search params gotten from the useSearchParams hook of next.js
const params = new URLSearchParams(searchParams)

    // set the capacity to the params
    params.set('capacity', filterTerm)

    // now we seek to navigate the user using the params we constructed, this will give us

    // route path?key=value

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false
    })
  }
  return (
    <div className="border border-primary-800 flex">
    <Button filter='all' handleFilter={handleFilter} activeFilter={activeFilter}>All Cabins</Button>
    <Button filter='small' handleFilter={handleFilter} activeFilter={activeFilter}>1&mdash;3 guests</Button>
    <Button filter='medium' handleFilter={handleFilter} activeFilter={activeFilter}>4&mdash;7 guests</Button>
    <Button filter='large' handleFilter={handleFilter} activeFilter={activeFilter}>8&mdash;12 guests</Button>
    </div>
  )
}

const Button = ({children,filter, handleFilter,activeFilter})=>{
  return (<button className={`px-5 py-2 hover:bg-primary-700 ${filter=== activeFilter ? 'bg-primary-700 text-primary-50' : ''}`} onClick={(()=> handleFilter(filter))}>{children}</button>
)
}
export default Filter