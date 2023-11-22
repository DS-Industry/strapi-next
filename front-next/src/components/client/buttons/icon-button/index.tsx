'use client'

interface IIconButton {
    iconElement: React.ReactNode,
    rotate?: string
}


export default function IconButton ({ iconElement, rotate='' }: IIconButton) {
    return (
        <button className={` rounded-full px-1 py-1 text-2xl flex justify-center items-center transition-all duration-300 flex-row text-white hover:bg-boxdark hover:text-3xl ${rotate} `}>
            {iconElement}
        </button>
    )
}