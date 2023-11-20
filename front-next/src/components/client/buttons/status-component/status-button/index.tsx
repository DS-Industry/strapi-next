'use client'

import { StatusAttributes, StrapiData } from "@/types/types"

interface IStatusButton {
    isLoading: boolean,
    statuses : StrapiData<StatusAttributes>[],
    handleClickChange : (event: React.MouseEvent<HTMLButtonElement>) => void,
}

export default function StatusButton ({ handleClickChange, statuses, isLoading} : IStatusButton) {
    return !isLoading && statuses &&  statuses.length > 0 ? (
        <div className="flex w-2/3 justify-between ml-2">
            {statuses.map((status: StrapiData<StatusAttributes>, index: number) => {
                return (
                    <button 
                        className=" bg-primary text-white px-3 py-1 border-2 border-white rounded-md transition-opacity duration-300 hover:border-primary" 
                        key={index} 
                        value={`${status.id}_${status.attributes.name}`}
                        onClick={handleClickChange}>
                        {status.attributes.name}
                    </button>
                )
            })}
        </div>
    ) : (
        <div className=" w-1/5 animate-pulse h-10 rounded-md bg-bodydark"></div>
    )
}