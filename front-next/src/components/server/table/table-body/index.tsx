import NavigationButton from "@/components/client/buttons/navigate-button";
import { RiExternalLinkLine } from 'react-icons/ri'
import { StrapiData, TaskAttributes } from "@/types/types";
import { dateToString } from "@/utils/util"
import CustomAvatarImage from "@/components/client/image";

interface ITbody {
    isSubTaskList: boolean
    data?: any
}

export default async function Tbody ({ isSubTaskList, data } : ITbody) {

    return (
        <tbody>
            {data ? 
                data.map((task : StrapiData<TaskAttributes>, index: number) => {
                    return (
                        <tr key={index} className="bg-white border-b dark:bg-boxdark-2 dark:border-boxdark hover:bg-gray dark:hover:bg-graydark">
                            <td className="px-6 py-4">
                                <NavigationButton className="bg-primary border-2 hover:border-primary border-white  text-white font-medium rounded-lg text-sm px-4 py-1.5" endpoint={isSubTaskList ? `${task.id}` : `tasks/${task.id}`} label={<RiExternalLinkLine />}/>
                            </td>
                            <td className="px-6 py-4">{task.attributes.title}</td>
                            <td className="px-6 py-4 flex justify-center">
                                    <CustomAvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}${task.attributes.createdUserBy.data.attributes.avatar.data.attributes.formats.large.url}`} width={0}/>
                            </td>
                            {!isSubTaskList && (
                                <>
                                    <td className="px-6 py-4">{task.attributes.department.data.attributes.name}</td>
                                    <td className="px-6 py-4">{task.attributes.carWashes.data.length > 0 ?task.attributes.carWashes.data[0].attributes.slug : '-'}</td>
                                </>
                                )
                            }
                            <td className="px-6 py-4">{task.attributes.priority}</td>
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