import { authOptions } from "@/config/nextauth/auth";
import Header from "@/components/client/header";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

export default async function Home () {
    const session = await getServerSession(authOptions);
    return (
        <main>
            <Header/>
            { !session ? 
                (
                    <h1>You should login</h1>
                ) :
                (
                    <div>
                        <h1>Hello, {session.user.username}</h1>                        
                    </div>
                )
            }
        </main>

    )
}