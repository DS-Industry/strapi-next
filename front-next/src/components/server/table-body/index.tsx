import { dateToString } from "@/utils/util"
import axios from "axios"

interface ITbody {
    search: string,
    sortType: string,
    name: string,
}

export default async function Tbody ({ search, sortType, name } : ITbody) {

    console.log('sort type in TBODY => ',sortType);


    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/search/${search}/${sortType}/${name}`);

    console.log(' this is data', data);

    return (
        <tbody>
            {data ? 
                data.map((ticket : any, index: number) => {
                    return (
                        <tr key={index} className="bg-white border-b dark:bg-boxdark-2 dark:border-boxdark hover:bg-gray dark:hover:bg-graydark">
                            <td className="px-6 py-4">{ticket.attributes.slug}</td>
                            <td className="px-6 py-4">{ticket.attributes.name}</td>
                            <td className="px-6 py-4">{ticket.attributes.createdUserBy.data.attributes.username}</td>
                            <td className="px-6 py-4">{ticket.attributes.departments.data[0].attributes.name}</td>
                            <td className="px-6 py-4">{ticket.attributes.carWash.data.attributes.slug}</td>
                            <td className="px-6 py-4">{ticket.attributes.priority.data.attributes.name}</td>
                            <td className="px-6 py-4">{ticket.attributes.status.data.attributes.name}</td>
                            <td className="px-6 py-4">{dateToString(ticket.attributes.createdAt)}</td>
                        </tr>
                    )
                }) :
                <p>Tickets not found</p>
            }
        </tbody>
    )
}