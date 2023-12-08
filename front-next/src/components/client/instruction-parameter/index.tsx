'use client'

import axios from "axios";
import { ChangeEvent, useState } from "react"
import QuillEditor from "../quill";
import { useSession } from "next-auth/react";
import Toast from "../toast";
import { useRouter } from "next/navigation";

export default function InstructionParameters () {
    const { data: session } = useSession();

    const [ instructionData, setInstructionData ] = useState<any>({
        name: '',
        phone: '',
        comment: ''
    });

    const [ error, setError ] = useState<string>('');
    const [ success, setSuccess ] = useState<string>('');
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const router = useRouter();

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
            const validationError = !instructionData.name || !instructionData.phone
            if (!validationError) {
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
                        asiignees: [session?.user.id],
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
                    setSuccess('Закрытое обращение успешно создано!');
                    router.push('/protected/tasks');
                } catch (error: any) {
                    console.log(error);
                    setError(error);
                }
            } else {
                setError("Не указано имя или номер телефона!");
            }
        }
        createClosedTicketAsync()
    }

    return (
        <div className=" w-6/12 px-3">
            <Toast text={error} closeToast={setError} type={"error"}/>
            <Toast text={success} closeToast={setSuccess} type={"success"}/>
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
                <button className=" mt-3 bg-primary text-white px-3 py-2 rounded-md hover:px-5 transition-all duration-300" onClick={handleCreateTicketClick}>
                    Создать закрытую заявку.
                </button>
            </div>
        ) : (
            <button className="mt-3 bg-primary text-white px-3 py-2 rounded-md hover:px-5 transition-all duration-300 " onClick={() => {setIsOpen(true)}}>
                Создать закрытую заявку.
            </button>
        )}
        </div>
    )
}