import { authOptions } from "@/config/nextauth/auth";
import { CarWashAttributes, StrapiData, StrapiResponseArray, TaskAttributes } from "@/types/types";
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
import Table from "@/components/server/table";
/* import Tabs from "@/components/client/tabs";
import Tab from "@/components/client/tabs/tab"; */
import { PiPencilSimpleLineFill } from "react-icons/pi";
import CommentComponent from "@/components/server/comment";
import EditTask from "@/components/client/edit-task";

export default async function SingleTaskPage ({ params } : any) {
    const session = await getServerSession(authOptions);
    const headers = {
            Authorization: `Bearer ${session?.user.jwt}`
    }

    const { data : task } : AxiosResponse<StrapiResponseArray<TaskAttributes>> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks?populate=*&filters[id][$eq]=${params.id}`,
    {
        headers
    });
    const { data : childTask } : AxiosResponse<StrapiResponseArray<TaskAttributes>> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks?populate[createdUserBy][populate][avatar]=*&populate[status][populate][fields]=*&populate[priority][populate][fields]=*&filters[parentTask][id][$eq]=${task.data[0].id}`,
    {
        headers
    }); 

    const [ { data  : departmentArr } , { data : carwashArr }, { data: userArr }, {data: categoryArr}, {data: subCategoryArr}] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/departments`, {
        headers
    }), axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/car-washes`, {
        headers
    }), axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        headers
    }), axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate[0]=department&filters[department][id][$eq]=${task.data[0].attributes.department.data.id}`, {
        headers
    }), axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories?populate[0]=category&filters[category][id][$eq]=${task.data[0].attributes.category.data.id}`, {
        headers
    }),

]);


    return (
        <main className=" flex h-full w-full flex-row justify-between">
                <div className=" pr-5 w-8/12">
                    <p className=" w-full flex justify-start items-center text-sm bg-gray text-body pl-2 rounded-md" 
                        >Cоздана {dateToString(task.data[0].attributes.createdAt)}, Обновлена {dateToString(task.data[0].attributes.updatedAt)}</p>
                    <div className=" h-1/2">
                        <p 
                            className=" w-full flex items-center mb-3 text-4xl h-12 bg-gray text-black border-white pl-2 rounded-md" 
                        >{task.data[0].attributes.title}</p>
                        {/* Add status button functionals */}
                        {/* <StatusComponent taskId={task.data[0].id} type="button" taskStatus={task.data[0].attributes.status.data} /> */}
                        {/* <StatusButton taskId={task.data[0].id} taskStatus={task.data[0].attributes.status.data}  />  */}
                        <div className=" mt-5 p-2 border-2 min-h-1/3  border-white rounded-md">
                            {parse(task.data[0].attributes.body)}
                        </div>
                        { task.data[0].attributes.attachments?.data && 
                            task.data[0].attributes.attachments.data.length > 0 && 
                            <Attachment attachments={task.data[0].attributes.attachments}/>
                        }
                        <div>
                            <div className=" w-full mt-10 overflow-auto">
                                {
                                    task.data[0].attributes.parentTask.data.length > 0 
                                    ? 
                                        '' : childTask.data.length > 0 ?
                                        (
                                            <SubTask 
                                                parentId={task.data[0].id} 
                                                isNotEmpty={childTask.data.length >= 0}>
                                                <Table isSubTaskList={true} data={childTask} endpoint=""/>
                                            </SubTask>
                                        ) 
                                    :   (
                                            <NavigationButton className=" hover:text-white bg-black text-white text-opacity-90 hover:text-opacity-100 hover:bg-graydark p-1 rounded-md transition-all duration-300" 
                                            label={(
                                                <div className=" w-auto flex items-center justify-between">
                                                    <p className=" pr-2">Создать подзадачу</p>
                                                    <PiPencilSimpleLineFill />
                                                </div>
                                            )} 
                                            endpoint={`/protected/tasks/create?parentTask=${task.data[0].id}`} />
                                        )
                                }
                            </div> 
                            <div data-label='Комментарии'>
                                <p className=" text-lg border-b border-primary text-black-2 ml-1 mt-5 pl-3">Комментарии</p>
                                <CommentComponent taskId={task.data[0].id} />
                            </div>
                            {/*<Tabs>
                                <Tab label="Комментарии">
                                <div className="py-2">
                                    <CommentComponent taskId={task.data[0].id} />
                                </div>
                                </Tab>
                                                             <Tab label="Вложения">
                                <div className="py-4">
                                    <h2 className="text-lg font-medium mb-2">Tab 2 Content</h2>
                                </div>
                                </Tab>
                                <Tab label="История">
                                <div className="py-4">
                                <h2 className="text-lg font-medium mb-2">Tab 3 Content</h2>
                                <p className="text-gray-700">
                                    history
                                </p>
                                </div>
                                </Tab> 
                            </Tabs>         */}
                        </div>
                    </div>
                </div>
                <EditTask 
                    taskId={task.data[0].id} 
                    taskStatus={task.data[0].attributes.status.data} 
                    priority={task.data[0].attributes.priority} 
                    type={task.data[0].attributes.type} 
                    deadline={task.data[0].attributes.deadline} 
                    department={`${task.data[0].attributes.department.data.id}_${task.data[0].attributes.department.data.attributes.name}`} 
                    category={`${task.data[0].attributes.category.data.id}_${task.data[0].attributes.category.data.attributes.name}`} 
                    subcategory={`${task.data[0].attributes.subcategory.data.id}_${task.data[0].attributes.subcategory.data.attributes.name}`} 
                    categoryArr={categoryArr.data}
                    subcategoryArr={subCategoryArr.data}
                    creator={task.data[0].attributes.createdUserBy.data.attributes.username} 
                    departmentArr={departmentArr.data}
                    userArr={userArr}
                    carWashArr={carwashArr.data}
                    executors={task.data[0].attributes.asiignees.data.map((executor: any) => `${executor.id}_${executor.attributes.username}`)} 
                    carWashes={task.data[0].attributes.carWashes.data.map((carwash: StrapiData<CarWashAttributes>) => `${carwash.id}_${carwash.attributes.name}`)}
                    />
        </main>
    );
}