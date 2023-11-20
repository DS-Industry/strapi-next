'useClient'

import { MdClose } from "react-icons/md"


interface ITaskItemList {
    taskItems: Array<any>
    deleteElement: any,
    name: string
}

const shortingStr = (str: string) => {
    const limit = 7;
    if (str.length <= limit) {
        return str; 
    } else {
        return str.slice(0, limit) + '...svg'
    }
    
}

export default function TaskItemList ({taskItems, deleteElement, name} : ITaskItemList) {
    return (
        <ol className={` flex ${name === 'attachments' ? 'flex-col' : 'flex-row' } flex-wrap`}>
            {
                taskItems.map((item: any, index: number) => {
                    return (
                        <li key={index} className=" bg-graydark p-1 text-xs rounded-md text-gray m-1">
                            <div className="flex justify-between items-center">
                                <p className=" mr-1">{name === 'attachments' ? shortingStr(item.name) : item.split('_')[1]}</p>
                                <label>
                                    <MdClose />
                                    <button type="button" className=" hidden" name={name} onClick={deleteElement} value={name === 'attachments' ? item.name : item} ></button>
                                </label>
                            </div>
                        </li>
                    )
                })
            }    
        </ol>     
    )
}