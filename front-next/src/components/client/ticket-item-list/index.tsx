'useClient'

import { MdClose } from "react-icons/md"


interface ITicketItemList {
    ticketItems: Array<any>
    deleteElement: any,
    name: 'attachments' | 'departments'
}

const shortingStr = (str: string) => {
    const limit = 7;
    if (str.length <= limit) {
        return str; 
    } else {
        return str.slice(0, limit) + '...svg'
    }
    
}

export default function TicketItemList ({ticketItems, deleteElement, name} : ITicketItemList) {
    return (
        <ol className=" flex flex-col w-1/2 mt-5 bg-gray-3 p-1 rounded-md text-black">
            {
                ticketItems.map((item: any, index: number) => {
                    return (
                        <li key={index}>
                            <div className="flex justify-between items-center">
                                <p>{name === 'attachments' ? shortingStr(item.name) : item.split('-')[1]}</p>
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