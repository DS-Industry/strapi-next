import DropdownButton from "@/components/client/buttons/dropdown-button";
import SearchInput from "@/components/client/inputs/search-input";
import Table from "@/components/server/table";
import { authOptions } from "@/config/nextauth/auth"
import { getServerSession } from "next-auth/next"

export default async function TaskListPage ({searchParams : { search, sortType, name }} : {searchParams: { search: string, sortType: string, name: string }}) {
    const { user } : any = await getServerSession(authOptions);
    return (
        <main className="overflow-x-auto shadow-md sm:rounded-lg">
            <p className=" mb-4 text-3xl text-boxdark font-semibold">Department {user.department.name}</p>
            <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-5 py-5">
                <div className="flex justify-evenly items-center w-1/6">
                    <DropdownButton />
                    {/* <NavigationButton endpoint="tasks/create" label="Create!" /> */}
                </div>
                <SearchInput />
            </div>
            <Table search={search} sortType={sortType} name={name} isSubTaskList={false} />
        </main>
    )
}