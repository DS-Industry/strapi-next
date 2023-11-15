'use client'

import Datepicker from "react-tailwindcss-datepicker";
import React, {useState} from "react"; 

interface IDataTimePicker {
    handleChange: any,
    name: string,
    value: any,
}

export default function DataTimePicker ({handleChange, name, value}: IDataTimePicker) {

    return (
        <div className=" text-black flex justify-between items-center">
            <p className=" text-white">Дедлайн</p>
            <div className=" w-1/2">
                <Datepicker 
                    inputName={name}
                    primaryColor="indigo"
                    popoverDirection="down"
                    showShortcuts={true}
                    i18n="ru"
                    useRange={false} 
                    asSingle={true} 
                    value={value} 
                    onChange={handleChange} />                
            </div>
        </div>
    )
}