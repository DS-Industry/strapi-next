'use client'

import { useRouter } from "next/navigation";

export const Button = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/mk-rest')
    }

    return (
        <div>
        <button 
            className='bg-indigo-500 text-white text-2xl p-3 rounded-full transition ease-in-out delay-550 hover:bg-orange-500 duration-500'
            onClick={handleClick}>
          Make new restourant!
        </button>
      </div>
    )
};