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
      ['link', 'image', 'video'],
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
    'image',
    'video',
  ]

interface IQuillEditor {
    handleChange : any
}

export default function QuillEditor ({  } : IQuillEditor ) {

    const [ value, setValue ] = useState<string>('');

    const handleChange = ({target : { value }} : any) => {
        setValue(value);
    }

    return (
      <QuillNoSSRWrapper onChange={handleChange} value={value} className=" transition-colors duration-150 mt-5 border-2 border-black hover:border-gray rounded-md bg-white" modules={modules} formats={formats}/>  
    )
}