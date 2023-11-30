import StatusDropDownList from "@/components/client/buttons/status-component/status-dropdown-list"
import { CarWashAttributes, StatusAttributes, StrapiData, UserAttributes } from "@/types/types"
import { dateToString } from "@/utils/util"

interface ITaskData {
    taskId: number,
    taskStatus: StrapiData<StatusAttributes>,
    priority: string,
    type: string,
    deadline: Date,
    department: string,
    category: string,
    subcategory: string,
    creator: string,
    executors: StrapiData<UserAttributes>[],
    carWashes: StrapiData<CarWashAttributes>[]
}

export default function TaskData ({taskId, taskStatus, priority, type, deadline, department, category, subcategory, creator, executors, carWashes}: ITaskData) {
    return (
        <div className=" bg-black text-white w-full flex flex-col justify-evenly min-h-110 max-h-115 p-5 rounded-md">
        {/* <StatusComponent taskId={task.data[0].id} type="list" taskStatus={task.data[0].attributes.status.data} />  */}
        <div className="flex flex-row justify-evenly items-center">
            <div className=" w-1/2 flex justify-start">
                <p>Статус : </p>
            </div>
            <div className=" w-1/2 px-2 flex justify-start">
                <StatusDropDownList taskId={taskId} taskStatus={taskStatus} />
            </div>
        </div>
        <div className="flex flex-row justify-evenly ">
            <div className=" w-1/2 flex justify-start">
                <p>Приоритет : </p>
            </div>
            <div className=" w-1/2 px-4 flex justify-start">
                <p>{priority}</p>
            </div>
        </div>
        <div className="flex flex-row justify-evenly ">
            <div className=" w-1/2 flex justify-start">
                <p>Тип : </p>
            </div>
            <div className=" w-1/2 px-4 flex justify-start">
                <p>{type}</p>
            </div>
        </div>
        <div className="flex flex-row justify-evenly ">
            <div className=" w-1/2 flex justify-start">
                <p>Дедлайн : </p>
            </div>
            <div className=" w-1/2 px-4 flex justify-start">
                <p>{dateToString(deadline)}</p>
            </div>
        </div>
        <div className="flex flex-row justify-evenly ">
            <div className=" w-1/2 flex justify-start">
                <p>Отдел : </p>
            </div>
            <div className=" w-1/2 px-4 flex justify-start">
                <p>{department}</p>
            </div>
        </div>
        <div className="flex flex-row justify-evenly ">
            <div className=" w-1/2 flex justify-start">
                <p>Категория : </p>
            </div>
            <div className=" w-1/2 px-4 flex justify-start">
                <p>{category}</p>
            </div>
        </div>
        <div className="flex flex-row justify-evenly ">
            <div className=" w-1/2 flex justify-start">
                <p>Подкатегория : </p>
            </div>
            <div className=" w-1/2 px-4 flex justify-start">
                <p>{subcategory}</p>
            </div>
        </div>
        <div className="flex flex-row justify-evenly ">
            <div className=" w-1/2 flex justify-start">
                <p>Создатель : </p>
            </div>
            <div className=" w-1/2 px-4 flex justify-start">
                <p>{creator}</p>
            </div>
        </div>
        <div className="flex flex-col justify-evenly ">
            <div className=" w-1/2 flex justify-start">                        
                <p>Исполнители : </p>
            </div>
            <div className=" w-full px-4 flex justify-start">
               <ul className="flex flex-col justify-start exclude-list-styling">
                {   executors.map((user: StrapiData<UserAttributes>, index: number) => {
                        return (
                            <li key={index}>{ user.attributes.username }</li>
                        )  
                    })}</ul> 
            </div>
        </div>
        <div className="flex flex-col justify-evenly ">
            <div className=" w-1/2 flex justify-start">
                <p>Мойки : </p>
            </div>
            <div className=" w-full px-2 flex justify-start">
               <ul className="flex flex-col justify-start exclude-list-styling">
                {   carWashes.map((carWash: StrapiData<CarWashAttributes>, index: number) => {
                        return (
                            <li key={index}>{ carWash.attributes.name }</li>
                        )  
                    })}</ul> 
            </div>
        </div>
 </div> 
    )
}