import { StrapiData, StrapiResponseArray, TaskAttributes } from "@/types/types";
import Tbody from "./table-body";
import TableHead from "./table-head";

interface ITable {
    data: StrapiData<TaskAttributes>[],
    isSubTaskList: boolean,
    endpoint: string,
}


export default function Table ({ data, isSubTaskList=false, endpoint }: ITable) {
    return (
        <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5`}>
            <TableHead isSubTaskList={isSubTaskList} endpoint={endpoint} />
            <Tbody  data={data} isSubTaskList={isSubTaskList}/>
        </table>
    )
}