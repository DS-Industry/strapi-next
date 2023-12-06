import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/nextauth/auth";
import Card from "@/components/server/card";
import axios from "axios";
import { StrapiData, TaskAttributes } from "@/types/types";
import CommentList from "@/components/server/comment/comment-list";
import { MdOutlineBarChart, MdLocalFireDepartment } from "react-icons/md";
import { RiLoopRightLine } from "react-icons/ri";
import { BsChatLeftTextFill } from "react-icons/bs";

export default async function Home () {
    const session = await getServerSession(authOptions);
    const headers = {
        Authorization: `Bearer ${session?.user.jwt}`
    }

    const today = new Date();
    let treeDaysAgo = new Date().setDate(today.getDate() - 3);
    const [ { data  : openTask } , { data : workTask }, { data: deadlineOverTask }, {data: commentData}] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks?populate=asiignees&filters[$or][0][status][id][$eq]=2&filters[$or][1][status][id][$eq]=7&filters[asiignees][id][$in]=${session?.user.id}`, {
        headers
        }), axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks?filters[status][id][$eq]=3&filters[asiignees][id][$in]=${session?.user.id}`, {
        headers
        }), axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks?filters[$and][0][deadline][$ls]=${today}&filters[$and][1][status][id][$lt]=8&filters[asiignees][id][$in]=${session?.user.id}`, {
        headers
        }), axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?populate[createdUserBy][populate][0]=avatar&populate=task&filters[$and][0][createdAt][$gt]=${treeDaysAgo}&filters[$and][1][createdUserBy][id][$eq]=${session?.user.id}`, {
            headers
        })
    ]);

    console.log(session?.user.department.id);



    return (
        <main>
            <p className="text-title-xl text-black-2">Главная</p>
            <div>
                <div className=" flex flex-wrap gap-5 w-full mt-5">
                <Card count={openTask.data.filter((task : StrapiData<TaskAttributes>) => task.attributes.type === 'Задача').length} label="Открытые задачи" icon={<MdOutlineBarChart />} />
                    <Card count={workTask.data.filter((task : StrapiData<TaskAttributes>) => task.attributes.type === 'Задача').length} label="Задачи в работе" icon={<RiLoopRightLine />} />
                    <Card count={deadlineOverTask.data.filter((task : StrapiData<TaskAttributes>) => task.attributes.type === 'Задача').length} label="Просроченные задачи" icon={<MdLocalFireDepartment />} attention={true}/>
                    <Card count={openTask.data.filter((task : StrapiData<TaskAttributes>) => task.attributes.type === 'Обращение').length} label="Открытые обращения" icon={<BsChatLeftTextFill />} />
                    <Card count={workTask.data.filter((task : StrapiData<TaskAttributes>) => task.attributes.type === 'Обращение').length} label="Обращения в работе" icon={<RiLoopRightLine />} />
                    <Card count={deadlineOverTask.data.filter((task : StrapiData<TaskAttributes>) => task.attributes.type === 'Обращение').length} label="Просроченные обращения" icon={<MdLocalFireDepartment />} attention={true} />
                </div>
            </div>
            <div className="w-full flex gap-10">
                <div className=" w-1/2 mt-10">
                    <div className=" rounded-xl border bg-white border-white p-3">
                        <p className=" text-xl text-black-2 ml-2">Комментарии за последние 3 дня</p>
                        <CommentList comments={commentData.data} homePage={true}/>
                    </div>
                </div>
                <div className=" w-1/2 mt-10">
                    <div className=" rounded-xl border bg-white border-white p-3">
                        <p className=" text-xl text-black-2 ml-2">Coming soon...</p>
                    </div>
                </div>
            </div>
        </main>
    )
}