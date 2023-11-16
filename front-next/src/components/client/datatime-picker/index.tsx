'use client'

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import 'moment/locale/ru';
import React from "react"; 

interface IDataTimePicker {
    handleChange: any,
    name: string,
    value: any,
}

export default function DataTimePicker ({handleChange, name, value}: IDataTimePicker) {

    console.log('this is value', value.length);

    const inputProps = {
        className: ' h-10 w-39 mx-0 bg-black box-border flex justify-end text-white placeholder:text-white z-0 relative hover:bg-graydark rounded-md px-3 py-2 focus:outline-none',
        placeholder: '-',
        value: value.length > 1 ? value : '-'
    }

    const renderTimeView = (mode : any, renderDefault: any) => {
        if (mode === "time") return renderDefault();
        return (
          <div className="wrapper">
            {renderDefault()}
            <div className="controls w-full flex justify-center mt-2 mb-2">
              <input type="time" value={value.split(' ')[1]} name={name} placeholder='-' onChange={handleChange} className=' bg-black w-1/3 flex justify-center hover:bg-graydark rounded-md' />
            </div>
          </div>
        );
    }

    return (
        <div className=" w-full text-black flex justify-between items-baseline box-border">
            <div>
                <p className=" text-white">Дедлайн</p>   
            </div>
            <div className=' w-39'>
                <Datetime renderView={renderTimeView} timeFormat={false} onChange={handleChange} dateFormat="YYYY-MM-DD" inputProps={ inputProps } locale='ru'/>   
            </div>        
        </div>
    )
}