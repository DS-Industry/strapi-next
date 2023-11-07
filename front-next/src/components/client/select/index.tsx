'use client'

interface ISelect {
    dataArr: Array<any>,
    name: string,
    handleChange: any,
    label: string,
}

export default function Select ({ dataArr, name, label, handleChange } : ISelect) {
    return (
        <div className=" flex flex-row justify-between my-2">
            <label htmlFor="priority">{label}</label>
            <select name={name} onChange={handleChange} className=" bg-black w-1/2 hover:bg-graydark rounded-md ">
                <option value='' defaultValue=''>---</option>
                { dataArr &&
                    dataArr.map((dataElement : any, index: number) => {
                        return (
                            <option key={dataElement.id} value={`${dataElement.id}-${dataElement.attributes.name}`}>{dataElement.attributes.name}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}