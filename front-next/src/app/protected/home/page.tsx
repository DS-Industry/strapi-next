import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/nextauth/auth";
import { MenuAuthLayout } from "@/components/client/layout/auth-layout";

export default async function Home () {
    const session = await getServerSession(authOptions);
    return (
        <MenuAuthLayout pageName={"home"}>
        <main>
            { !session ? 
                (
                    <h1>You should login</h1>
                ) :
                (
                    <div>
                        <h1>Hello, {session.user?.email}</h1> 
                    </div>

                )
            }
        </main>
    </MenuAuthLayout>
    )
}