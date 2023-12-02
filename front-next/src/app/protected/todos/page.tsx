import DropdownButton from "@/components/client/buttons/dropdown-button";
import SearchInput from "@/components/client/inputs/search-input";
import Table from "@/components/server/table";
import { authOptions } from "@/config/nextauth/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function TodoListPage ({searchParams : { search, sortType, name, type }} : {searchParams: { search: string, sortType: string, name: string, type: string }}) {
    const { user } : any = await getServerSession(authOptions);
    return (
        <main className="overflow-x-auto shadow-md sm:rounded-lg">
            <p className=" mb-4 text-3xl text-boxdark font-semibold">Department {user.department.name}</p>
            <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-5 py-5">
                <div className="flex justify-evenly items-center w-1/6">
                <Link href="tasks/create?type=task" className="block rounded-md px-4 py-2 transition-all duration-300 bg-primary w-auto border-2 border-gray hover:border-primary text-white ">Создать задачу</Link>
                </div>
                <SearchInput />
            </div>
            <Table search={search} type={type} sortType={sortType} name={name} isSubTaskList={false} />
        </main>
    )
}