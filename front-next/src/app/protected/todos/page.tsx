import SearchInput from "@/components/client/inputs/search-input";
import Table from "@/components/server/table";
import { authOptions } from "@/config/nextauth/auth";
import { StrapiResponseArray, TaskAttributes } from "@/types/types";
import axios, { AxiosResponse } from "axios";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function TodoListPage ({searchParams : { search, sortType, name }} : {searchParams: { search: string, sortType: string, name: string, table: string, tableValue: string }}) {
    const session  = await getServerSession(authOptions);
    
    const { data: departmentTaskList }: AxiosResponse<StrapiResponseArray<TaskAttributes>> = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/search/${search}/${sortType}/${name}/department/${session?.user.department.id}?type=Задача`, {
        headers: {
            Authorization: `Bearer ${session?.user.jwt}`
        }
    });
    const { data: personalTaskList }: AxiosResponse<StrapiResponseArray<TaskAttributes>> = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/search/${search}/${sortType}/${name}/person/${session?.user.id}?type=Задача`, {
        headers: {
            Authorization: `Bearer ${session?.user.jwt}`
        }
    });
    const { data: ClosedTask }: AxiosResponse<StrapiResponseArray<TaskAttributes>> = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/search/${search}/${sortType}/${name}/closed/${session?.user.department.id}?type=Задача`, {
        headers: {
            Authorization: `Bearer ${session?.user.jwt}`
        }
    });

    return (
        <main className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-evenly items-center w-full">
                <p className="text-3xl text-boxdark font-semibold">Отдел {session?.user.department.name}</p>
                    <Link href="todos/create?type=Задача" className="block rounded-md px-4 py-2 transition-all duration-300 bg-primary w-auto border-2 border-gray hover:border-primary text-white ">Создать задачу</Link>
                    <SearchInput />
            </div>
            <div>
                <div className="flex items-center justify-start bg-white dark:bg-gray-900 py-5 mt-10 px-10">
                    <p className=" text-2xl text-black-2">Задачи Отдела</p>
                </div>
                <Table data={departmentTaskList} isSubTaskList={false} endpoint="todos"  />
            </div>
            <div>
                <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-10 py-5 mt-10">
                    <p className=" text-2xl text-black-2" >Мои задачи</p>

                </div>
                <Table data={personalTaskList} isSubTaskList={false} endpoint="todos" />
            </div>
            <div>
                <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-10 py-5 mt-10">
                    <p className=" text-2xl text-black-2" >Закрытые задачи</p>
                </div>
                <Table data={ClosedTask} isSubTaskList={false} endpoint="todos" />
            </div>
        </main>
    )
}