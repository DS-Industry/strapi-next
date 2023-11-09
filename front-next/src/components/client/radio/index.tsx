'use client'

import { MdFlag } from 'react-icons/md'

interface IRadio {
    label: string,
    name: string,
    valueArr: Array<{value: string, color: string}>
    handleChange: any
}

export default function Radio ({label, name, valueArr, handleChange }: IRadio) {
    return (
        <>
            <p className=" text-center">{label}</p>
            <div className=" flex flex-row justify-evenly">
                {
                    valueArr.map(( element: {value: string, color: string}, index: number ) => {
                        return (
                            <div key={index} className=" flex flex-row items-center ">
                                <input 
                                    className=" mr-1" 
                                    id={element.value} 
                                    type="radio" 
                                    name={name} 
                                    value={element.value}
                                    onChange={handleChange} />
                                <label htmlFor={element.value} key={index} className={`${element.color} flex flex-row`}>
                                    <MdFlag /><MdFlag /><MdFlag />
                                </label>
                            </div>
                            
                        )
                    })
                }
            </div>
        </>
    )
}