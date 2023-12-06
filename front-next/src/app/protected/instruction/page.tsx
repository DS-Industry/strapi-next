import InstructionParameters from "@/components/client/instruction-parameter";
import Wiki from "@/components/server/wiki";
import { authOptions } from "@/config/nextauth/auth";
import { getServerSession } from "next-auth";

export default async function InsrtuctionPage () {
    const session = await getServerSession(authOptions);
    return (
        <main>

            <div className=" flex justify-between">
                <Wiki src="http://wiki.onvione.ru" />
                <InstructionParameters session={session?.user} />
            </div>
        </main>
    )
}