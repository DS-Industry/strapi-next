import SortButton from "@/components/client/buttons/sort-button";

interface ITableHead {
    isSubTaskList: boolean
}

export default function TableHead ({isSubTaskList} : ITableHead) {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-1 py-1 text-center">
                    Link
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                { !isSubTaskList ?  <SortButton title="Name" name="title"/> : 'Name'}
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Creator
                    {/* <SortButton title="Creator" name="createdUserBy"/> */}
                </th>
                { !isSubTaskList && (
                    <>
                        <th scope="col" className="px-6 py-3 text-center">
                            Department
                            {/* <SortButton title="Department" name="departments"/> */}
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            carWash
                            {/* <SortButton title="Carwash" name="carWash"/> */}
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Priority
                            {/* <SortButton title='Priority' name="priority"/> */}
                        </th>
                    </>
                    )
                }
                <th scope="col" className="px-6 py-3 text-center">
                    Status
                    {/* <SortButton title='Status' name="status"/> */}
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    { !isSubTaskList ?  <SortButton title="Created At" name="title"/> : 'Updated At'}
                </th>
            </tr>
        </thead>
    )
}