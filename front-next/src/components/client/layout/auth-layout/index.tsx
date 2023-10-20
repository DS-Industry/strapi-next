import { Footer } from "@/components/server/footer";
import Header from "../../header/auth-header";

interface IMenuLayout {
    children: React.ReactNode,
    pageName: string
}

export function MenuAuthLayout ({children, pageName}: IMenuLayout) {
    return (
        <div className="h-auto w-screen flex">
            <div className=" h-full sticky top-0 sidebar">
                <Header className={pageName} />
            </div>
            <div className=" h-screen shadow-2xl content z-20">
                {children}
                <Footer/>
            </div>

        </div>
    )
}