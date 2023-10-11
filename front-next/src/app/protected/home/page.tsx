import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/nextauth/auth";
import Header from "@/components/client/header";
import { Session } from "next-auth";

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
                        <h1>Hello, {session.user?.email}</h1> 
                        <pre>{JSON.stringify(session)}</pre>                       
                    </div>

                )
            }
        </main>

    )
}