import { StrapiResponseArray, TaskAttributes } from "@/types/types";
import Tbody from "./table-body";
import TableHead from "./table-head";

interface ITable {
    search?: string,
    sortType?: string,
    name?: string,
    childTask?: StrapiResponseArray<TaskAttributes>,
    isSubTaskList: boolean
}


export default function Table ({search, sortType, name, childTask, isSubTaskList=false}: ITable) {
    return (
        <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5 `}>
            <TableHead isSubTaskList={isSubTaskList}/>
            <Tbody search={search} sortType={sortType} name={name} childTask={childTask} isSubTaskList={isSubTaskList}/>
        </table>
    )
}