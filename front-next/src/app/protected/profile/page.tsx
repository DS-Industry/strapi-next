import { authOptions } from "@/config/nextauth/auth";
import { getServerSession } from "next-auth";
import { LogoutButton } from "@/components/client/buttons/auth-button";

export default async function Home () {
    const session = await getServerSession(authOptions);
    return (
        <main className=" flex justify-between p-5 items-center">
            <div>
                <h1>Hello, {session?.user.username}</h1>                        
            </div>
            <LogoutButton />
        </main>            


    )
}