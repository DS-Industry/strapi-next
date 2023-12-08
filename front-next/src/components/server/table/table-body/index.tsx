import NavigationButton from "@/components/client/buttons/navigate-button";
import { RiExternalLinkLine } from 'react-icons/ri'
import { StrapiData, StrapiResponseArray, TaskAttributes } from "@/types/types";
import { dateToString } from "@/utils/util"
import CustomAvatarImage from "@/components/client/image";
import { IoMdFlag } from "react-icons/io";

interface ITbody {
    isSubTaskList: boolean
    data: StrapiData<TaskAttributes>[]
}

export default async function Tbody ({ isSubTaskList, data } : ITbody) {

    const today = new Date().getTime();

    return (
        <tbody>
            {data ? 
                data.map((task : StrapiData<TaskAttributes>, index: number) => {
                    const deadlineDate = new Date(task.attributes.deadline).getTime();
                    return (
                        <tr key={index} className="bg-white border-b dark:bg-boxdark-2 dark:border-boxdark hover:bg-gray dark:hover:bg-graydark">
                            <td className="px-2 py-4">
                                <NavigationButton className="bg-primary border-2 hover:border-primary border-white  text-white font-medium rounded-lg text-sm px-4 py-1.5" endpoint={isSubTaskList ? `${task.id}` : `tasks/${task.id}`} label={<RiExternalLinkLine />}/>
                            </td>
                            <td className="px-3 py-4">
                                <div>
                                    <p>{task.attributes.title}</p>
                                    { task.attributes.parentTask && task.attributes.parentTask.data[0] && task.attributes.parentTask.data[0].id && 
                                        (<p className=" bg-secondary text-black p-1 w-1/2 text-xs rounded-md text-center" >
                                            Подзадача
                                        </p>
                                        )
                                    }
                                </div>
                            </td>
                            <td className="px-6 py-4 flex justify-center items-center">
                                {
                                    task.attributes.createdUserBy.data.attributes.avatar.data ?
                                        <CustomAvatarImage src={`${task.attributes.createdUserBy.data.attributes.avatar.data.attributes.url}`} width={0}/> : task.attributes.createdUserBy.data.attributes.name
                                }   
                            </td>
                            {!isSubTaskList && (
                                <>
                                    <td className="px-6 py-4">{task.attributes.department.data.attributes.name}</td>
                                    <td className="px-6 py-4">{
                                        task.attributes.asiignees.data[0].attributes.avatar.data ?
                                            <CustomAvatarImage src={`${task.attributes.asiignees.data[0].attributes.avatar.data.attributes.url}`} width={0}/> : task.attributes.asiignees.data[0].attributes.name
                                        }
                                    </td>
                                </>
                                )
                            }
                            <td className="px-10 py-4 text-xl">
                                <div className={` w-full flex flex-row items-center ${task.attributes.priority === 'Низкий' ? ' text-meta-5' : task.attributes.priority === 'Средний' ? ' text-success' : ' text-danger' }`}>
                                    <IoMdFlag /><IoMdFlag /><IoMdFlag />        
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className=" bg-secondary px-2 py-1 text-center rounded-md text-black">
                                    {task.attributes.status.data.attributes.title}    
                                </p>
                            </td>
                            <td className="px-6 py-4"> {
                                !isSubTaskList ? 
                                dateToString(task.attributes.createdAt) : 
                                dateToString(task.attributes.updatedAt)}
                            </td>
                            <td className={`px-6 py-4`}>
                                <p className={` p-1 text-center rounded-md ${today > deadlineDate && task.attributes.status.data.id < 8 && 'bg-meta-1 text-white '}`}>
                                    {dateToString(task.attributes.deadline)}
                                </p>
                            </td>
                        </tr>
                    )
                }) :
                <p>Здесь будут отображаться задачи</p>
            }
        </tbody>
    )
}