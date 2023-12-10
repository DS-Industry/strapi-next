'use client'

interface ITab {
    label: string,
    children: React.ReactNode
}

export default function Tab ({ label, children }: ITab) {
    return (
        <div data-label={label} className="hidden w-full">
            {children}
        </div>
    )
}