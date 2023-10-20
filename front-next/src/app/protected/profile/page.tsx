import { authOptions } from "@/config/nextauth/auth";
import Header from "@/components/client/header/auth-header";
import { getServerSession } from "next-auth";
import { MenuAuthLayout } from "@/components/client/layout/auth-layout";

export default async function Home () {
    const session = await getServerSession(authOptions);
    return (
        <MenuAuthLayout pageName={"profile"}>
        <main>
            {
                (
                    <div>
                        <h1>Hello, {session?.user.username}</h1>                        
                    </div>
                )
            }
        </main>            
        </MenuAuthLayout>


    )
}