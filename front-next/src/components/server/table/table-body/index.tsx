import NavigationButton from "@/components/client/buttons/navigate-button";
import { RiExternalLinkLine } from 'react-icons/ri'
import { StrapiData, TaskAttributes } from "@/types/types";
import { dateToString } from "@/utils/util"
import axios from "axios"
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/nextauth/auth";

interface ITbody {
    search?: string,
    sortType?: string,
    name?: string,
    childTask?: any,
    isSubTaskList: boolean
}

export default async function Tbody ({ search, sortType, name, isSubTaskList, childTask } : ITbody) {
    const session = await getServerSession(authOptions);
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/search/${search}/${sortType}/${name}`, {
        headers: {
            Authorization: `Bearer ${session?.user.jwt}`
        }
    });

    const dataArr = isSubTaskList ? childTask.data : data

    return (
        <tbody>
            {dataArr ? 
                dataArr.map((task : StrapiData<TaskAttributes>, index: number) => {
                    return (
                        <tr key={index} className="bg-white border-b dark:bg-boxdark-2 dark:border-boxdark hover:bg-gray dark:hover:bg-graydark">
                            <td className="px-6 py-4">
                                <NavigationButton endpoint={`tasks/${task.id}`} label={<RiExternalLinkLine />}/>
                            </td>
                            <td className="px-6 py-4">{task.attributes.title}</td>
                            <td className="px-6 py-4">{task.attributes.createdUserBy.data.attributes.username}</td>
                            {!isSubTaskList && (
                                <>
                                    <td className="px-6 py-4">{task.attributes.department.data.attributes.name}</td>
                                    <td className="px-6 py-4">{task.attributes.carWashes.data[0].attributes.slug}</td>
                                    <td className="px-6 py-4">{task.attributes.priority}</td>
                                </>
                                )
                            }
                            <td className="px-6 py-4">{task.attributes.status.data.attributes.name}</td>
                            <td className="px-6 py-4"> {
                                !isSubTaskList ? 
                                dateToString(task.attributes.createdAt) : 
                                dateToString(task.attributes.updatedAt)}
                            </td>
                        </tr>
                    )
                }) :
                <p>Tasks not found</p>
            }
        </tbody>
    )
}