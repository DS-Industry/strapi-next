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
            <p className=' text-5xl'>Система Help Desk</p>
            <p>Help Desk - это инструмент, предназначенный для систематического контроля, управления и отслеживания выполнения задач в проекте или организации. Он обеспечивает возможность создания, назначения, приоритезации и мониторинга задач, а также позволяет командам эффективно сотрудничать, устанавливать сроки и следить за прогрессом проектов.</p>
          </div>
        </div>  
      </main>
    </GeneralLayout>
  )
}

