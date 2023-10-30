'use client'

interface ISelect {
    dataArr: Array<any>
}

export default function Select ({ dataArr } : ISelect) {
    return (
        <>
            <label htmlFor="priority">Priority</label>
            <select>
                <option>Select Priority</option>
                { dataArr &&
                    dataArr.map((dataElement : any, index: number) => {
                        return (
                            <option key={index}>{dataElement.name}</option>
                        )
                    })
                }
            </select>
        </>
    )
}