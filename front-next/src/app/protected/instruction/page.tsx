import InstructionParameters from "@/components/client/instruction-parameter";
import Wiki from "@/components/server/wiki";

export default async function InsrtuctionPage () {
    return (
        <main>
            <div className=" flex justify-between">
                <Wiki src="http://wiki.onvione.ru" />
                <InstructionParameters />
            </div>
        </main>
    )
}