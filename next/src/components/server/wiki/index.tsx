interface IWiki {
    src: string
}

export default function Wiki ({ src }: IWiki) {
    return (
        <div className=" w-6/12 h-30">
            <iframe className=" w-full h-171.5" src={src}></iframe>
        </div>
    )
}