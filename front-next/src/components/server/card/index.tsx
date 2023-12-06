'use client'

interface ICard {
    count: number,
    label: string,
    icon: React.ReactNode,
    attention?: boolean
}

export default function Card ({count, label, icon, attention}: ICard) {

    return (
        <div className={`flex gap-10 items-center px-2 w-fit h-25 rounded-xl border bg-white ${!attention ? 'border-white' : ' border-meta-1' }`}>
            <div>
                <div className=" flex justify-center items-center text-gray-3 w-15 h-15 rounded-full bg-gray">
                    <p className={`p-2 truncate text-primary text-4xl`}>
                        {icon}
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-start">
                <p className=" text-body text-sm">
                    {label}
                </p>
                <p className=" text-black-2 text-xl font-semibold">{count}</p>
            </div>
        </div>
    )
}