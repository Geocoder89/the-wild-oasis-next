import React from 'react'
import { auth } from '../_lib/auth'

export const metadata = {
  title: 'Account'
}
const Page = async () => {
  const session = await auth()
  const name = session?.user.name.split(' ').at(0)

  
  
  return (
    <div>

    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome {name}
      </h2>
    </div>
  )
}

export default Page