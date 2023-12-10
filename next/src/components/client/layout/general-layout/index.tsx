import { Footer } from "@/components/server/footer";
import { GeneralHeader } from "../../header/general-header";

interface IMenuLayout {
    children: React.ReactNode,
    pageName: string
}

export function GeneralLayout ({children, pageName}: IMenuLayout) {
    return (
        <div className="h-screen w-screen flex flex-col justify-between">
            <GeneralHeader className={pageName} />
                {children}
                <Footer/>  

        </div>
    )
}