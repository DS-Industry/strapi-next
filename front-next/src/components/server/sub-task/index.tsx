import NavigationButton from "@/components/client/buttons/navigate-button";
import { StrapiResponseArray, TaskAttributes } from "@/types/types";
import Table from "../table";


interface ISubTask {
    parentId: number,
    childTask: StrapiResponseArray<TaskAttributes>
}

export default function SubTask ({parentId, childTask}: ISubTask) {
    return childTask.data.length > 0 ? (
        <div className=" w-full mt-10 overflow-auto">
            <div className=" flex flex-row justify-between w-full items-center">
                <p className=" text-3xl">Подзадачи</p>
                <NavigationButton label={"Создать подзадачу!"} endpoint={`/protected/tasks/create?parentTask=${parentId}`} />
            </div>
            <Table isSubTaskList={true} childTask={childTask} />
        </div>
    ) : ( 
        <div className=" w-full mt-10 overflow-auto">
            <NavigationButton label={"Создать подзадачу!"} endpoint={`/protected/tasks/create?parentTask=${parentId}`} />
        </div> 
    )
}