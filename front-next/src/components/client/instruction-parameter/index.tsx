'use client'

import axios from "axios";
import { useSession } from "next-auth/react"
import { ChangeEvent, useState } from "react"
import QuillEditor from "../quill";

export default function InstructionParameters ({ session }: {session: any}) {

    const [ instructionData, setInstructionData ] = useState<any>({
        name: '',
        phone: '',
        comment: ''
    });

    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInstructionData((prevData : any) => { 
            return {
            ...prevData,
            [event.target.name] : event.target.value
        }})
    }

    const handleClosedCommentChange = (context: any) => {
        setInstructionData((prevData: any) => { return {
            ...prevData,
            comment: context,
        }})
    }

    const handleCreateTicketClick = () => {
        const createClosedTicketAsync = async () => {
            try {
                const ticketBody = {
                    title: 'Общая информация',
                    body: `Имя: ${instructionData.name},\n Номер телефона: ${instructionData.phone},\n Комментарий: ${instructionData.comment}`,
                    type: 'Обращение',
                    category: 15,
                    subcategory: 20,
                    createdUserBy: session?.user.id,
                    carWashes: [],
                    priority: 'Низкий',
                    department: 6,
                    asiignees: [],
                    attachments: [],
                    status: 8,
                    isClosed: true,
                    isDeleted: false,
                    deadline: new Date(),
                }
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`,{
                    data: ticketBody
                }, {
                    headers: {
                        Authorization: `Bearer ${session?.user.jwt}`
                    }
                })
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        createClosedTicketAsync()
    }

    return (
        <div className=" w-6/12 px-3">
            <div className=" flex flex-col ">
                <input 
                    autoFocus
                    type="text"
                    name="name" 
                    value={instructionData.name}
                    placeholder="Введите Имя"
                    onChange={handleChange} 
                    className=" w-full mb-3 transition-colors duration-150 h-10 bg-gray border-bodydark2 text-black pl-2 rounded-md hover:border-gray focus:border hover:bg-bodydark1 focus:border-bodydark2 focus:outline-none" />
                <input 
                    type="text"
                    name="phone" 
                    value={instructionData.phone}
                    placeholder="Введите номер телефона"
                    onChange={handleChange} 
                    className=" w-full mb-3 transition-colors duration-150 h-10 bg-gray border-bodydark2 text-black pl-2 rounded-md hover:border-gray focus:border hover:bg-bodydark1 focus:border-bodydark2 focus:outline-none" />
            </div>
        {/*             
            <div>
                <p>Общая информация</p>
            </div>
            <div>
                <p>Акции</p>
            </div>
            <div>
                <p>Ошибки</p>
            </div> 
        */}
        { isOpen ? (
            <div>
                <QuillEditor handleChange={handleClosedCommentChange} label="Создать закрытую заявку" openEditorEx={true} />
                <button className="" onClick={handleCreateTicketClick}>
                    Создать закрытую заявку.
                </button>
            </div>
        ) : (
            <button className="" onClick={() => {setIsOpen(true)}}>
                Создать закрытую заявку.
            </button>
        )}
        </div>
    )
}