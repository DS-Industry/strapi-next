import DropdownButton from "@/components/client/buttons/dropdown-button";
import NavigationButton from "@/components/client/buttons/navigate-button";
import SortButton from "@/components/client/buttons/sort-button";
import SearchInput from "@/components/client/inputs/search-input";
import Tbody from "@/components/server/table-body";
import { authOptions } from "@/config/nextauth/auth"
import { getServerSession } from "next-auth/next"

export default async function TicketListPage ({searchParams : { search, sortType, name }} : {searchParams: { search: string, sortType: string, name: string }}) {
    const { user } : any = await getServerSession(authOptions);
    return (
        <main className="overflow-x-auto shadow-md sm:rounded-lg">
            <p className=" mb-4 text-3xl text-boxdark font-semibold">Department {user.department.name}</p>
            <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-5 py-5">
                <div className="flex justify-evenly items-center w-1/6">
                    {/* <DropdownButton /> */}
                    <NavigationButton endpoint="createticket" label="Create!" />
                </div>
                <SearchInput />
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Key
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <SortButton title="Name" name="name"/>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Creator
                            {/* <SortButton title="Creator" name="createdUserBy"/> */}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Department
{/*                             <SortButton title="Department" name="departments"/> */}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            carWash
                            {/* <SortButton title="Carwash" name="carWash"/> */}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Priority
                            {/* <SortButton title='Priority' name="priority"/> */}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                            {/* <SortButton title='Status' name="status"/> */}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <SortButton title='Created At' name="createdAt"/>
                        </th>
                    </tr>
                </thead>
                <Tbody search={search} sortType={sortType} name={name} />
            </table>
        </main>
    )
}