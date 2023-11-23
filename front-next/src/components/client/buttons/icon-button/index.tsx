'use client'

interface IIconButton {
    iconElement: React.ReactNode,
    rotate?: string,
    name?: string,
    isDisabled?: string,
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}


export default function IconButton ({ iconElement, handleClick, rotate='', name='icon', isDisabled='middle' }: IIconButton) {
    return (
        <button
            disabled={isDisabled === name || isDisabled.includes(name)}
            name={name}
            className={`rounded-full px-1 py-1 text-2xl flex justify-center items-center transition-all duration-300 flex-row text-white hover:bg-boxdark hover:text-3xl ${rotate} disabled:hover:text-2xl disabled:hover:bg-boxdark-2 disabled:opacity-65`} onClick={handleClick}>
            {iconElement}
        </button>
    )
}