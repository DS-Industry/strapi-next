'use client'

interface ICreateButton {
    data: any,
    label: string,
    endpoint: string
}

export default function CreateButton ({ data, label, endpoint } : ICreateButton) {



    return (
        <button className=" bg-primary transition-all duration-300 hover:p-4 text-white px-3 py-2 mt-5 rounded-md shadow-lg hover:">
            {label}
        </button>
    )
}