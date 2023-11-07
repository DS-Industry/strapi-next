'use client'

import 'react-quill/dist/quill.snow.css';

import dynamic from "next/dynamic";
import { ChangeEvent, useState } from 'react';

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading</p>
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


  const handleQuillChange = ( context: string ) => {
    setValue(context);
    handleChange(context)
  }


    return (
      <div>
        <QuillNoSSRWrapper
          placeholder='Write description for task to help your colleages fully understand it'
          id='quill-editor' 
          onChange={handleQuillChange} 
          value={value} 
          modules={modules} 
          formats={formats}/>  
      </div>
    )
}