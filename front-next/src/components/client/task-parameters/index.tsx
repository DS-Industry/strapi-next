'use client'

import { CarWashAttributes, CategoryAttributes, DepartmentAttributes, StatusAttributes, StrapiData, StrapiResponseObject, SubCategoryAttributes, UserAttributes } from "@/types/types";
import DropdownList from "../buttons/dropdown-list";
import { ChangeEvent, useEffect, useState } from "react";
import TaskItemList from "../task-item-list";
import DataTimePicker from "../datatime-picker";
import axios from "axios";
import { useSession } from "next-auth/react";
import { priorityArr } from "@/components/server/hard-data";

interface ITaskParameters {
    taskData: any,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    deleteElement: any,
    departmentArr: Array<StrapiData<DepartmentAttributes>>,
    userArr: Array<StrapiData<UserAttributes>>,
    carWashArr: Array<StrapiData<CarWashAttributes>>,
    setTaskData: any
}

interface ICategories  {
    categoryArr: Array<StrapiData<CategoryAttributes>>,
    subcategoryArr: Array<StrapiData<SubCategoryAttributes>>
}

export default function TaskParameters ({ 
        taskData, 
        handleChange, 
        deleteElement, 
        departmentArr,  
        userArr, 
        carWashArr,
        setTaskData
    } : ITaskParameters) {

        const [ categoryArrs, setCategoryArrs ] = useState<ICategories>({
            categoryArr: [],
            subcategoryArr: [],
        });
        const {data : session} = useSession();

        useEffect(() => {
            const getCategoryAsync = async () => {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate[0]=department&filters[department][id][$eq]=${taskData.department}`, {
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }     
                });
                console.log('category arr -> ');
                console.log(response.data.data);
                console.log('task category data -> ');
                console.log(taskData.category)

                setCategoryArrs({
                    ...categoryArrs,
                    categoryArr: [...response.data.data]
                }); 
                setTaskData({
                    ...taskData,
                    category: '',
                    subcategory: ''
                });         
            }

            if(taskData.department) {
                getCategoryAsync();   
            }
        },[taskData.department])
    
        useEffect(() => {
            const getSubCategoryAsync = async () => {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories?populate[0]=category&filters[category][id][$eq]=${taskData.category}`, {
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }     
                });
                setCategoryArrs({
                    ...categoryArrs,
                    subcategoryArr: [...response.data.data]
                });
                setTaskData({
                    ...taskData,
                    subcategory: ''
                });           
            }
            if (taskData.category) {
                getSubCategoryAsync();            
            }
        },[taskData.category])

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