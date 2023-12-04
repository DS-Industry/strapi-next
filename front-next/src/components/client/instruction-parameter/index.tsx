'use client'

import { ChangeEvent, useState } from "react"

export default function InstructionParameters () {

    const [ instructionData, setInstructionData ] = useState<any>({
        name: '',
        phone: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInstructionData((prevData : any) => { 
            return {
            ...prevData,
            [event.currentTarget.name] : event.currentTarget.value
        }})
    }

    return (
        <div className=" w-6/12 px-3">
            <div className=" flex flex-col ">
                <input 
                    autoFocus
                    type="text"
                    name="name" 
                    value={instructionData.name}
                    placeholder="Введите Имя"
                    onChange={handleChange} 
                    className=" w-full mb-3 transition-colors duration-150 h-10 bg-gray border-bodydark2 text-black pl-2 rounded-md hover:border-gray focus:border hover:bg-bodydark1 focus:border-bodydark2 focus:outline-none" />
                <input 
                    type="text"
                    name="phone" 
                    value={instructionData.phone}
                    placeholder="Введите номер телефона"
                    onChange={handleChange} 
                    className=" w-full mb-3 transition-colors duration-150 h-10 bg-gray border-bodydark2 text-black pl-2 rounded-md hover:border-gray focus:border hover:bg-bodydark1 focus:border-bodydark2 focus:outline-none" />
            </div>
            <div>
                <p>Общая информация</p>
            </div>
            <div>
                <p>Акции</p>
            </div>
            <div>
                <p>Ошибки</p>
            </div>
        </div>
    )
}