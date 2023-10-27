import TicketCreationForm from "@/components/client/forms/create-ticket";
import { authOptions } from "@/config/nextauth/auth";
import { CarWashAttributes, DepartmentAttributes, PriorityAttributes, StrapiResponse } from "@/types/ticket";
import axios from "axios";
import { getServerSession } from "next-auth/next";

export default async function CreateTicketPage () {
    const { user } : any = await getServerSession(authOptions);
    const headers = {
        Authorization: `Bearer ${user.jwt}`
    }
    const { data : priority } : StrapiResponse<PriorityAttributes> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/priorities?fields=name`, {
        headers
    })
    const { data : department } : StrapiResponse<DepartmentAttributes> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/departments?fields=name`, {
        headers
    })
    const { data : carwash } : StrapiResponse<CarWashAttributes> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/car-washes?fields=name`, {
        headers
    })
    return (
        <main>
            <TicketCreationForm priorityArr={priority.data} departmentArr={department.data} carWashArr={carwash.data} />
        </main>
    )
}