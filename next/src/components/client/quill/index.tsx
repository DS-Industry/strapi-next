'use client'

import 'react-quill/dist/quill.snow.css';

import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import { LuPencilLine } from "react-icons/lu"

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => {
      return (
        <div className=" animate-pulse h-50 mt-4 w-full bg-bodydark1 rounded-md">
        </div>
      ) }
})

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
      ],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,

    },
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
  ]

interface IQuillEditor {
    handleChange: any,
    label: string,
    openEditorEx?: boolean,
    loading?: boolean
}

export default function QuillEditor ({ handleChange, label, openEditorEx, loading } : IQuillEditor ) {

  const [value, setValue] = useState<string>('');
  const [openEditor, setOpenEditor] = useState<boolean>(openEditorEx || false);

  const handleQuillChange = ( context: string ) => {
    setValue(context);
    handleChange(context)
  }

  const handleClick = () => {
    setOpenEditor(true);
  }

  useEffect(() => {
    if (loading) {
      setValue('');
    }
  }, [loading])


    return (
      <div>
        {
          !openEditor ? (
            <button 
              className=' group w-full text-sm text-left opacity-50 pl-2 py-2 text-opacity-50 transition-colors duration-150 rounded-md text-black hover:bg-bodydark1 hover:text-opacity-100 flex flex-row justify-between pr-5'
              onClick={handleClick}>
              <p>{label}</p>
              <LuPencilLine className='text-lg opacity-0 group-hover:opacity-100' />
            </button>
          ) : (
            <QuillNoSSRWrapper
              placeholder='Начните вводить текст...'
              id={`quill-editor`} 
              className=' qull-h-300'
              onChange={handleQuillChange} 
              value={value} 
              modules={modules} 
              formats={formats}/>  
          )
        }
      </div>
    )
}