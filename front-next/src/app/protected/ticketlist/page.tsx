import DropdownButton from "@/components/client/buttons/dropdown-button";
import SearchInput from "@/components/client/inputs/search-input";
import Tbody from "@/components/server/table-body";
import { authOptions } from "@/config/nextauth/auth"
import { dateToString } from "@/utils/util";
import axios from "axios";
import { getServerSession } from "next-auth/next"

export default async function TicketListPage ({searchParams : { search }} : {searchParams: { search: string }}) {
    const { user } : any = await getServerSession(authOptions);
    //const { data }  = await axios.get(`${process.env.NEXT_PUBLIC_URL}/search`)
    return (
        <main className="overflow-x-auto shadow-md sm:rounded-lg">
            <p className=" mb-4 text-3xl text-boxdark font-semibold">Department {user.department.name}</p>
            <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-5 py-5">
                <DropdownButton />
                <SearchInput />
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Key</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Creator</th>
                        <th scope="col" className="px-6 py-3">Executed Department</th>
                        <th scope="col" className="px-6 py-3">CarWash</th>
                        <th scope="col" className="px-6 py-3">Priority</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Created At</th>
                    </tr>
                </thead>
                <Tbody search={search} />
            </table>
        </main>
    )
}