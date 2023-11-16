import { CarWashAttributes, CategoryAttributes, DepartmentAttributes, PriorityAttributes, StrapiData, SubCategoryAttributes, TaskAttributes, UserAttributes } from "@/types/types";
import DropdownList from "../buttons/dropdown-list";
import { ChangeEvent } from "react";
import TaskItemList from "../task-item-list";
import DataTimePicker from "../datatime-picker";

interface ITaskParameters {
    taskData: any,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    deleteElement: any,
    handleDTPickerChange: (moment: ChangeEvent<HTMLInputElement> | any) => void,
    priorityArr: any,
    departmentArr: Array<StrapiData<DepartmentAttributes>>,
    categoryArrs: {categoryArr: Array<StrapiData<CategoryAttributes>>, subcategoryArr: Array<StrapiData<SubCategoryAttributes>>},
    userArr: Array<StrapiData<UserAttributes>>,
    carWashArr: Array<StrapiData<CarWashAttributes>>

}

export default function TaskParameters ({ 
        taskData, 
        handleChange, 
        handleDTPickerChange,
        deleteElement, 
        priorityArr, 
        departmentArr, 
        categoryArrs, 
        userArr, 
        carWashArr
    }: ITaskParameters) {
    return (
        <div className=" border bg-black text-white w-4/12 flex flex-col h-125 justify-between p-5 rounded-md">
            <DropdownList taskData={taskData} handleChange={handleChange} name="priority" label="Приоритет" dataArr={priorityArr} />
            <DropdownList taskData={taskData} handleChange={handleChange} name='department' label="Отдел" dataArr={departmentArr} />
            <DropdownList taskData={taskData} handleChange={handleChange} name='category' label="Категория" dataArr={categoryArrs.categoryArr} />
            <DropdownList taskData={taskData} handleChange={handleChange} name='subcategory' label="Подкатегория" dataArr={categoryArrs.subcategoryArr} />
            <DropdownList taskData={taskData} handleChange={handleChange} name='asiignees' label="Исполнители" dataArr={userArr} />
                {taskData.asiignees.length ?
                    <TaskItemList taskItems={taskData.asiignees} deleteElement={deleteElement} name="asiignees" />  
                        : ''            
                }
            <DropdownList taskData={taskData} handleChange={handleChange} name='carWashes' label="АМС" dataArr={carWashArr} />
                {taskData.carWashes.length ?
                        <TaskItemList taskItems={taskData.carWashes} deleteElement={deleteElement} name="carWashes" />  
                        : ''            
                    }
            <DataTimePicker handleChange={handleDTPickerChange} name="deadline" value={`${taskData.deadlineDate} ${taskData.deadlineTime}`} />
                </div>
    )
}