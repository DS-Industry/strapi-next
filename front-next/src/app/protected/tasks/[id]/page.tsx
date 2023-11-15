import Select from "@/components/client/select";
import { authOptions } from "@/config/nextauth/auth";
import { CarWashAttributes, StatusAttributes, StrapiData, StrapiResponseArray, TaskAttributes, UserAttributes } from "@/types/types";
import { dateToString } from "@/utils/util";
import axios, { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import parse from 'html-react-parser'
import Attachment from "@/components/server/attachment";
import CreateButton from "@/components/client/buttons/create-button";
import NavigationButton from "@/components/client/buttons/navigate-button";
import List from "@/components/client/list";

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

    console.log(task.data[0].attributes.status);

    const { data : statuses } : AxiosResponse<StrapiResponseArray<StatusAttributes>> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/statuses`,
    {
        headers: {
            Authorization: `Bearer ${session?.user.jwt}`
        }
    })

    return (
        <main className=" flex h-full w-full flex-row justify-between">
                <div className=" pr-5 w-8/12">
                    <div className=" h-1/2">
                        <p 
                            className=" w-full flex items-center mb-3 text-4xl transition-colors duration-150 h-12 border-2 bg-gray text-black border-white pl-2 rounded-md" 
                        >{task.data[0].attributes.title}</p>
{/*                         <div className="flex w-full justify-evenly">
                            {statuses.data.map((status: StrapiData<StatusAttributes>, index: number) => {
                                return status.attributes.name !== 'Created' && status.attributes.name !== 'Deleted' && (
                                    <button className=" bg-primary text-white p-2 border-2 border-white rounded-md transition-opacity duration-300 hover:border-primary" key={index} value={`${status.id}_${status.attributes.name}`}>
                                        {status.attributes.name}
                                    </button>
                                )
                            })}
                        </div> */}
                        <div className=" mt-5 p-2 border-2 h-1/3 border-white rounded-md">{parse(task.data[0].attributes.body)}</div>
                        { task.data[0].attributes.attachments?.data && 
                            task.data[0].attributes.attachments.data.length > 0 && 
                            <Attachment attachments={task.data[0].attributes.attachments}/>}

                        <div className=" flex w-full justify-between items-center mt-10">
                            <NavigationButton label={"Создать!"} endpoint={`/protected/tasks/create?parentTask=${task.data[0].id}`} />
                            <List childTask={childTask} />
                        </div>
                    </div>
                    <div>{/* comments, attachments, history */}</div>
                </div>
                <div className=" bg-black text-white w-4/12 flex flex-col justify-evenly  p-5 h-132.5 rounded-md">
                    <Select dataArr={statuses.data} name={"status"} handleChange={null} label={"Cтатус"} taskid={params.id} initStatus={task.data[0].attributes.status} />
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Приоритет : </p>
                        </div>
                        <div className=" w-1/2 flex justify-start">
                            <p>{task.data[0].attributes.priority}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Тип : </p>
                        </div>
                        <div className=" w-1/2 flex justify-start">
                            <p>{task.data[0].attributes.type}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Создана : </p>
                        </div>
                        <div className=" w-1/2 flex justify-start">
                            <p>{dateToString(task.data[0].attributes.createdAt)}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Дедлайн : </p>
                        </div>
                        <div className=" w-1/2 flex justify-start">
                            <p>{dateToString(task.data[0].attributes.deadline)}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Отдел : </p>
                        </div>
                        <div className=" w-1/2 flex justify-start">
                            <p>{task.data[0].attributes.department.data.attributes.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Категория : </p>
                        </div>
                        <div className=" w-1/2 flex justify-start">
                            <p>{task.data[0].attributes.category.data.attributes.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Подкатегория : </p>
                        </div>
                        <div className=" w-1/2 flex justify-start">
                            <p>{task.data[0].attributes.subcategory.data.attributes.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Создатель : </p>
                        </div>
                        <div className=" w-1/2 flex justify-start">
                            <p>{task.data[0].attributes.createdUserBy.data.attributes.username}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">                        
                            <p>Исполнители : </p>
                        </div>
                        <div className=" w-1/2 flex justify-start ">
                            <p>{task.data[0].attributes.asiignees.data.map((user: StrapiData<UserAttributes>) => user.attributes.username)}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly ">
                        <div className=" w-1/2 flex justify-start">
                            <p>Мойки : </p>
                        </div>
                        <div className=" w-1/2 flex justify-start">
                           <p className="flex justify-start">{task.data[0].attributes.carWashes.data.map((carWash: StrapiData<CarWashAttributes>) => carWash.attributes.name)}</p> 
                        </div>
                        
                        
                    </div>
                </div>
        </main>
    );
}