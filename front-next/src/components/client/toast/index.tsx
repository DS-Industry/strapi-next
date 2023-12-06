'use client'

import { useEffect } from "react"

interface IToast {
    text: string,
    closeToast: any,
    type: 'success' | 'warning' | 'error'
}

export default function Toast ({text, closeToast, type} : IToast) { 
    const styleObj = {
        'error' : {
            head : 'flex items-center justify-between rounded-t-lg border-b-2 border bg-meta-7 bg-clip-padding px-4 pb-2 pt-2.5 text-white',
            body : 'break-words rounded-b-lg bg-meta-7 px-4 py-4 text-white'
        },
        'warning' : {
            head : 'flex items-center justify-between rounded-t-lg border-b-2 border-warning bg-meta-7 bg-clip-padding px-4 pb-2 pt-2.5 text-white',
            body: 'break-words rounded-b-lg bg-warning px-4 py-4 text-white'
        },
        'success' : {
            head : 'flex items-center justify-between rounded-t-lg border-b-2 border-success  bg-meta-3  bg-clip-padding px-4 pb-2 pt-2.5 text-white',
            body: 'break-words rounded-b-lg bg-meta-3 px-4 py-4 text-white'
        }
    }
    const handleClose = () => {
        closeToast('')
    }

    useEffect(() => {
        setTimeout(() => {
            closeToast('');
        }, 3000)
    },[closeToast, text])

    return (
    <div
        className={`mx-auto mb-4 transition-all ease-in-out duration-1000 ${text ? 'block absolute top-15 opacity-100 transition-all ease-in-out duration-300' : 'hidden opacity-0'} w-96 max-w-full rounded-lg bg-clip-padding text-sm text-textColor shadow-lg shadow-black/5`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-te-autohide="false">
        <div className={styleObj[type].head}>
            <p className="flex items-center font-bold">
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="times-circle"
                className="mr-2 h-4 w-4 fill-current"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                    fill="currentColor"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
            </svg>
                {type === 'error' ? 'Ошибка!' : type === 'warning' ? 'Внимание!' : 'Упешно!'}
            </p>
            <div className="flex items-center">
                <button
                    type="button"
                    className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    aria-label="Close"
                    onClick={handleClose}
                    >
                    <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
        <div className={styleObj[type].body}>
            {text}
        </div>
    </div>
)}