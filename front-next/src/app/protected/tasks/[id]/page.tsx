import Select from "@/components/client/select";
import { authOptions } from "@/config/nextauth/auth";
import { StatusAttributes, StrapiData, StrapiResponseArray, StrapiResponseObject, TaskAttributes, UserAttributes } from "@/types/types";
import { dateToString } from "@/utils/util";
import axios from "axios";
import { getServerSession } from "next-auth";
import { MdFlag } from 'react-icons/md'

export default async function SingleTaskPage ({params} : any) {
    const session = await getServerSession(authOptions);
    const { data: task } : any = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks?populate=*&filters[id][$eq]=${params.id}`,
    {
        headers: {
            Authorization: `Bearer ${session?.user.jwt}`
        }
    });

    const { data : statuses } : any = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/statuses`,
    {
        headers: {
            Authorization: `Bearer ${session?.user.jwt}`
        }
    })

    console.log(statuses.data[0]);
    console
    return (
        <main className=" flex h-full w-full min-h-fit flex-row justify-between">
                <div className=" pr-5 w-8/12">
                    <div className=" h-1/2">
                        <p 
                            className=" w-full mb-3 align-baseline text-6xl transition-colors duration-150 h-15 border-2 bg-gray text-black border-white pl-2 rounded-md" 
                        >{task.data[0].attributes.title}</p>
                        <div>
                            {statuses.data.map((status: StrapiData<StatusAttributes>, index: number) => {
                                return status.attributes.name !== 'Created' && status.attributes.name !== 'Created' && (
                                    <button key={index} value={`${status.id}_${status.attributes.name}`}>
                                        {status.attributes.name}
                                    </button>
                                )
                            })}
                        </div>
                        <div>{/* here will be status select */} status buttons</div>
                        <div>{/* {data.attributes.body} */} body</div>
                        <div>{/* attachments */} attachments</div>
                        <div>{/* add todo like task */}Task button</div>
                    {/* <CreateButton label="Create task" /> */}
                    </div>
                    <div>{/* comments, attachments, history */}</div>
                </div>
                <div className=" bg-black text-white w-4/12 flex flex-col  p-5 h-2/3 rounded-md">
                    <Select dataArr={statuses.data} name={"status"} handleChange={null} label={"Cтатус"} taskid={params.id} />
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
                           <p className="flex justify-start">{task.data[0].attributes.carWashes.data.map((carWash: StrapiData<UserAttributes>) => carWash.attributes.name)}</p> 
                        </div>
                        
                        
                    </div>
                </div>
        </main>
    );
}