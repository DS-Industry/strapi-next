'use client'

export default function AttachmentsInput () {
    return (
        <div className=" mt-5">
            <label 
                htmlFor="inputImage" 
                className=" text-sm px-2 py-2 border-2 border-white transition-colors duration-150 rounded-md text-black hover:bg-bodydark1 hover:border-bodydark1 ">
                <input id="inputImage" className=" hidden" multiple accept="image/*" name="file" type="file" />
                Add attachments            
            </label>
        </div>

    )
}
