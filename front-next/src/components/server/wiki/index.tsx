interface IWiki {
    src: string
}

export default function Wiki ({ src }: IWiki) {
    return (
        <div className=" w-6/12">
            <iframe className=" w-full min-h-screen" src={src}></iframe>
        </div>
    )
}