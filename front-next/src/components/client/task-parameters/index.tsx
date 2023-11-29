import { CarWashAttributes, CategoryAttributes, DepartmentAttributes, StatusAttributes, StrapiData, StrapiResponseObject, SubCategoryAttributes, UserAttributes } from "@/types/types";
import DropdownList from "../buttons/dropdown-list";
import { ChangeEvent } from "react";
import TaskItemList from "../task-item-list";
import DataTimePicker from "../datatime-picker";

interface ITaskParameters {
    taskData: any,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    deleteElement: (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    handleDTPickerChange: (moment: ChangeEvent<HTMLInputElement> | any) => void,
    priorityArr: any,
    departmentArr: Array<StrapiData<DepartmentAttributes>>,
    categoryArrs: {categoryArr: Array<StrapiData<CategoryAttributes>>, subcategoryArr: Array<StrapiData<SubCategoryAttributes>>},
    userArr: Array<StrapiData<UserAttributes>>,
    carWashArr: Array<StrapiData<CarWashAttributes>>,
    status? : StrapiResponseObject<StatusAttributes>,
    statusArr? : any,
    edit?: boolean,
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
        carWashArr,
        status,
        statusArr
    } : ITaskParameters) {

    return (
        <div className=" border bg-black text-white w-4/12 flex flex-col min-h-90 h-auto justify-between p-5 rounded-md">

            { status && statusArr && statusArr.data.length > 0 ? 
                <DropdownList taskData={status.data.attributes.name} handleChange={handleChange} name="status" label="Cтатус" dataArr={statusArr.data} />
                :
                ''
            }
            <DropdownList taskData={taskData} handleChange={handleChange} name="priority" label="Приоритет" dataArr={priorityArr} />
            <DropdownList taskData={taskData} handleChange={handleChange} name='department' label="Отдел" dataArr={departmentArr} />
            <DropdownList taskData={taskData} handleChange={handleChange} name='category' label="Категория" dataArr={categoryArrs.categoryArr} />
            <DropdownList taskData={taskData} handleChange={handleChange} name='subcategory' label="Подкатегория" dataArr={categoryArrs.subcategoryArr} />
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