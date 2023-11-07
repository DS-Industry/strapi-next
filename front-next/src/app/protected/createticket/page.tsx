import TicketCreationForm from "@/components/client/forms/create-ticket";
import { authOptions } from "@/config/nextauth/auth";
import axios from "axios";
import { getServerSession } from "next-auth/next";

export default async function CreateTicketPage () {
    const { user } : any = await getServerSession(authOptions);
    const headers = {
        Authorization: `Bearer ${user.jwt}`
    }

    const [ { data : priority }, { data  : department } , { data : carwash } ] = await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/priorities?fields=name`, {
            headers
        }), axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/departments?fields=name`, {
            headers
        }), axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/car-washes?fields=name`, {
            headers
        }) 
    ]);
    return (
        <main>
            <TicketCreationForm priorityArr={priority.data} departmentArr={department.data} carWashArr={carwash.data} />
        </main>
    )
}