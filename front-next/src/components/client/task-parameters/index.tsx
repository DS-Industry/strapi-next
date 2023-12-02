'use client'

import { CarWashAttributes, CategoryAttributes, DepartmentAttributes, StatusAttributes, StrapiData, StrapiResponseObject, SubCategoryAttributes, UserAttributes } from "@/types/types";
import DropdownList from "../buttons/dropdown-list";
import { ChangeEvent } from "react";
import TaskItemList from "../task-item-list";
import DataTimePicker from "../datatime-picker";
import { priorityArr } from "@/components/server/hard-data";

interface ITaskParameters {
    taskData: any,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    deleteElement: any,
    departmentArr: Array<StrapiData<DepartmentAttributes>>,
    userArr: Array<StrapiData<UserAttributes>>,
    carWashArr: Array<StrapiData<CarWashAttributes>>,
    setTaskData: any
    initCategoryArr: StrapiData<CategoryAttributes>[],
    initSubcategoryArr: StrapiData<SubCategoryAttributes>[]
}

export default function TaskParameters ({ 
        taskData, 
        handleChange, 
        deleteElement, 
        departmentArr,  
        userArr, 
        carWashArr,
        setTaskData,
        initCategoryArr,
        initSubcategoryArr
    } : ITaskParameters) {


        const handleDTPickerChange = (moment: any) => {
            if(moment.target) {
                setTaskData({
                    ...taskData,
                    deadlineTime: moment.target.value
                })
            } else {
                const day = moment._d.getDate() < 10 ? `0${moment._d.getDate()}` : moment._d.getDate();
                const month = moment._d.getMonth() < 9 ? `0${moment._d.getMonth() + 1}` : moment._d.getMonth() + 1;
                const data = `${day}.${month}.${moment._d.getFullYear()}`
                console.log(data);
            setTaskData({
                ...taskData,
                deadlineDate: data
            }) 
            }
        }

    return (
        <div className=" border bg-black text-white w-full flex flex-col min-h-90 h-auto justify-between p-5 rounded-md">
            <DropdownList taskData={taskData} handleChange={handleChange} name="priority" label="Приоритет" dataArr={priorityArr} />
            <DropdownList taskData={taskData} handleChange={handleChange} name='department' label="Отдел" dataArr={departmentArr} />
            <DropdownList taskData={taskData} handleChange={handleChange} name='category' label="Категория" dataArr={initCategoryArr} />
            <DropdownList taskData={taskData} handleChange={handleChange} name='subcategory' label="Подкатегория" 
                dataArr={initSubcategoryArr} />
            <div>
                <DropdownList taskData={taskData} handleChange={handleChange} name='asiignees' label="Исполнители" dataArr={userArr} />
                    { taskData.asiignees.length ?
                        <TaskItemList taskItems={taskData.asiignees} deleteElement={deleteElement} name="asiignees" />  
                            : (
                                <div>
                                    <p className=" p-1 text-xs text-body h-8 ">Здесь появятся выбранные сотрудники...</p>
                                </div>
                            )            
                    }   
            </div>
            <div>
                <DropdownList taskData={taskData} handleChange={handleChange} name='carWashes' label="АМС" dataArr={carWashArr} />
                    {taskData.carWashes.length ?
                            <TaskItemList taskItems={taskData.carWashes} deleteElement={deleteElement} name="carWashes" />  
                            : (
                                <div>
                                    <p className=" p-1 text-xs text-body h-8 ">Здесь появятся выбранные мойки...</p>
                                </div>
                            )                   
                    }
            </div>
            <DataTimePicker handleChange={handleDTPickerChange} name="deadline" value={`${taskData.deadlineDate} ${taskData.deadlineTime}`} />
        </div>
    )
}