import SortButton from "@/components/client/buttons/sort-button";

interface ITableHead {
    isSubTaskList: boolean,
    endpoint: string,
}

export default function TableHead ({isSubTaskList, endpoint } : ITableHead) {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-1 py-1 text-center">
                    Ссылка
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                { !isSubTaskList ?  <SortButton title="Название" name="title" endpoint={endpoint}/> : 'Название'}
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Создатель
                    {/* <SortButton title="Creator" name="createdUserBy"/> */}
                </th>
                { !isSubTaskList && (
                    <>
                        <th scope="col" className="px-6 py-3 text-center">
                            Отдел
                            {/* <SortButton title="Department" name="departments"/> */}
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Исполнитель
                            {/* <SortButton title="Carwash" name="carWash"/> */}
                        </th>
                    </>
                    )
                }
                <th scope="col" className="px-6 py-3 text-center">
                    Приоритет
                    {/* <SortButton title='Priority' name="priority"/> */}
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Статус
                    {/* <SortButton title='Status' name="status"/> */}
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    { !isSubTaskList ?  <SortButton title="Дата создания" name="createdAt" endpoint={endpoint} /> : 'Дата создания'}
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    { !isSubTaskList ?  <SortButton title="Cрок выполнения" name="deadline" endpoint={endpoint} /> : 'Дата создания'}
                </th>
            </tr>
        </thead>
    )
}