'use client'

interface IDatalist {
    handleChange: any,
    userArr: any
}

export default function Datalist ({handleChange, userArr}: IDatalist) {
    return (
        <>
            <label htmlFor="users">Users</label>
            <input className=" text-black-2" type="text" list="asiignees" id="users" name="asiignees" onChange={handleChange} />
            <datalist id="asiignees" className=" block bg-body">
                {
                    userArr.map((user: any, index: number) => {
                        return (
                            <option key={index} value={`${user.id}-${user.username}`} />
                        )
                    })
                }
            </datalist>
        </>
    )
}