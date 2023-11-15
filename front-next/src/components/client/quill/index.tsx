'use client'

import 'react-quill/dist/quill.snow.css';

import dynamic from "next/dynamic";
import { useState } from 'react';
import { LuPencilLine } from "react-icons/lu"

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => {
      return (
        <div className=" animate-pulse h-80 mt-4 w-full bg-bodydark1 rounded-md">
        </div>
      ) }
})

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
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
    'indent',
    'link',
  ]

interface IQuillEditor {
    handleChange: any,
}

export default function QuillEditor ({ handleChange } : IQuillEditor ) {

  const [value, setValue] = useState<string>('');
  const [openEditor, setOpenEditor] = useState<boolean>(false);



  const handleQuillChange = ( context: string ) => {
    setValue(context);
    handleChange(context)
  }

  const handleClick = () => {
    setOpenEditor(true);
  }


    return (
      <div>
        {
          !openEditor ? (
            <button 
              className=' group w-full text-sm text-left opacity-50 px-2 py-2 text-opacity-50 transition-colors duration-150 rounded-md text-black hover:bg-bodydark1 hover:text-opacity-100 flex flex-row justify-between pr-5'
              onClick={handleClick }>
              <p>Добавте описание задачи, чтобы исполнителю было понятно, что нужно сделать в этой задаче</p>
              <LuPencilLine className='text-lg opacity-0 group-hover:opacity-100' />
            </button>
          ) : (
            <QuillNoSSRWrapper
              placeholder='Напишите описание здесь'
              id='quill-editor' 
              onChange={handleQuillChange} 
              value={value} 
              modules={modules} 
              formats={formats}/>  
          )
        }
      </div>
    )
}