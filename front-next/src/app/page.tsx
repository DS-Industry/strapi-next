import Image from 'next/image';
import Hero from './../../public/hero_1.svg'
import { GeneralLayout } from '@/components/client/layout/general-layout';
import StyledLayout from '@/components/server/layout';

export default async function Home() {

  return (
    <GeneralLayout pageName='landing'>
      <main className="flex h-full flex-col items-center justify center">
        <div className="mb-32 text-center pt-16">
            <h2 className={` text-2xl font-semibold`}>
              Добро пожаловать в HELP DESK!
            </h2>
        </div>
        <div className=' w-full flex justify-evenly items-center'>
          <div className=' w-1/3'>
            <p className=' text-5xl'>Lorem ipsum dolor sit amet consectetur</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem voluptate sunt dolor neque ea consectetur. Nesciunt tempore, itaque fuga saepe, incidunt obcaecati nostrum tempora at explicabo rem numquam quasi magni. Praesentium, vero hic dolores in, deserunt nihil optio, incidunt autem obcaecati veritatis ipsam nulla. Iste dolor, soluta aspernatur ipsa fugiat neque aut?</p>
          </div>
          <div className=' w-1/3'>
            <Image  src={Hero} alt='hero img' />
          </div>
        </div>  
      </main>
    </GeneralLayout>
  )
}

