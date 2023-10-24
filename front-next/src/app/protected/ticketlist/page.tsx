import { authOptions } from "@/config/nextauth/auth"
import axios from "axios";
import { getServerSession } from "next-auth/next"

export default async function TicketListPage () {
    const { user } : any = await getServerSession(authOptions);
    console.log(user);
    const { data } : any = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`, {
        headers: {
            Authorization: `Bearer ${user.jwt}`
        }
    });

    console.log(data);
    return (
        <main>
            <p className=" text-4xl text-black">
                Department {user.department? user.department?.name : 'IT' }
            </p>
            <table className=" bg-bodydark1 text-body  w-full mt-4">
                <thead>
                    <tr>
                        <th>New window</th>
                        <th>Key</th>
                        <th>Name</th>
                        <th>Creator</th>
                        <th>Executed Department</th>
                        <th>carWash</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </main>
    )
}