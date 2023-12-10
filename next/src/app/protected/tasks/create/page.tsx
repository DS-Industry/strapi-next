import TaskCreationForm from "@/components/client/forms/create-task";
import { authOptions } from "@/config/nextauth/auth";
import axios from "axios";
import { getServerSession } from "next-auth/next";

export default async function CreateTaskPage ({ searchParams } : any) {
    const { user } : any = await getServerSession(authOptions);
    const headers = {
        Authorization: `Bearer ${user.jwt}`
    }


    const [ { data  : department } , { data : carwash }, { data: users }] = await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/departments`, {
            headers
        }), axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/car-washes`, {
            headers
        }), axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
            headers
        })
    ]);

    return (
        <main>
            <TaskCreationForm 
                type='Обращение' 
                parentTask={searchParams.parentTask}
                initUserArr={users} 
                departmentArr={department.data} 
                carWashArr={carwash.data} />
        </main>
    )
}