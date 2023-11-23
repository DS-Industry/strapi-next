import { authOptions } from "@/config/nextauth/auth";
import { CarWashAttributes, StrapiData, StrapiResponseArray, TaskAttributes, UserAttributes } from "@/types/types";
import { dateToString } from "@/utils/util";
import axios, { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import parse from 'html-react-parser'
import NavigationButton from "@/components/client/buttons/navigate-button";
/* import StatusComponent from "@/components/client/buttons/status-component";
import StatusButton from "@/components/client/buttons/status-component/status-button"; */
import StatusDropDownList from "@/components/client/buttons/status-component/status-dropdown-list";
import Attachment from "@/components/client/attachment";
import SubTask from "@/components/server/sub-task";

export default async function SingleTaskPage ({params} : any) {
    const session = await getServerSession(authOptions);
    const { data : task } : AxiosResponse<StrapiResponseArray<TaskAttributes>> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks?populate=*&filters[id][$eq]=${params.id}`,
    {
        headers: {
            Authorization: `Bearer ${session?.user.jwt}`
        }
    });
    const { data : childTask } : AxiosResponse<StrapiResponseArray<TaskAttributes>> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks?populate=*&filters[parentTaskId][id][$eq]=${task.data[0].id}`,
    {
        headers: {
            Authorization: `Bearer ${session?.user.jwt}`
        }
    });

    return (
        <main className=" flex h-full w-full flex-row justify-between">
                <div className=" pr-5 w-7/12">
                    <p className=" w-full flex justify-start items-center text-sm bg-gray text-body pl-2 rounded-md" 
                        >Cоздана {dateToString(task.data[0].attributes.createdAt)}, Обновлена {dateToString(task.data[0].attributes.updatedAt)}</p>
                    <div className=" h-1/2">
                        <p 
                            className=" w-full flex items-center mb-3 text-4xl h-12 bg-gray text-black border-white pl-2 rounded-md" 
                        >{task.data[0].attributes.title}</p>
                        {/* Add status button functionals */}
                        {/* <StatusComponent taskId={task.data[0].id} type="button" taskStatus={task.data[0].attributes.status.data} /> */}
                        {/* <StatusButton taskId={task.data[0].id} taskStatus={task.data[0].attributes.status.data}  /> */}
                        <div className=" mt-5 p-2 border-2 min-h-1/3  border-white rounded-md">
                            {parse(task.data[0].attributes.body)}
                        </div>
                        { task.data[0].attributes.attachments?.data && 
                            task.data[0].attributes.attachments.data.length > 0 && 
                            <Attachment attachments={task.data[0].attributes.attachments}/>}
                        <SubTask parentId={task.data[0].id} childTask={childTask} />
                    </div>
                    <div>{/* comments, attachments, history */}</div>
                </div>
                <div className=" bg-black text-white w-5/12 flex flex-col justify-evenly min-h-110 p-5 rounded-md">
                    {/* <StatusComponent taskId={task.data[0].id} type="list" taskStatus={task.data[0].attributes.status.data} /> */}
                    <div className="flex flex-row justify-evenly items-center ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Статус : </p>
                        </div>
                        <div className=" w-1/2 px-2 flex justify-start">
                            <StatusDropDownList taskId={task.data[0].id} taskStatus={task.data[0].attributes.status.data} />
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Приоритет : </p>
                        </div>
                        <div className=" w-1/2 px-4 flex justify-start">
                            <p>{task.data[0].attributes.priority}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Тип : </p>
                        </div>
                        <div className=" w-1/2 px-4 flex justify-start">
                            <p>{task.data[0].attributes.type}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Дедлайн : </p>
                        </div>
                        <div className=" w-1/2 px-4 flex justify-start">
                            <p>{dateToString(task.data[0].attributes.deadline)}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Отдел : </p>
                        </div>
                        <div className=" w-1/2 px-4 flex justify-start">
                            <p>{task.data[0].attributes.department.data.attributes.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Категория : </p>
                        </div>
                        <div className=" w-1/2 px-4 flex justify-start">
                            <p>{task.data[0].attributes.category.data.attributes.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Подкатегория : </p>
                        </div>
                        <div className=" w-1/2 px-4 flex justify-start">
                            <p>{task.data[0].attributes.subcategory.data.attributes.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Создатель : </p>
                        </div>
                        <div className=" w-1/2 px-4 flex justify-start">
                            <p>{task.data[0].attributes.createdUserBy.data.attributes.username}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-evenly ">
                        <div className=" w-1/2 flex justify-start">                        
                            <p>Исполнители : </p>
                        </div>
                        <div className=" w-full px-4 flex justify-start">
                           <ul className="flex flex-col justify-start">
                            {   task.data[0].attributes.asiignees.data.map((user: StrapiData<UserAttributes>, index: number) => {
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
                           <ul className="flex flex-col justify-start">
                            {   task.data[0].attributes.carWashes.data.map((carWash: StrapiData<CarWashAttributes>, index: number) => {
                                    return (
                                        <li key={index}>{ carWash.attributes.name }</li>
                                    )  
                                })}</ul> 
                        </div>
                    </div>
                </div>
        </main>
    );
}