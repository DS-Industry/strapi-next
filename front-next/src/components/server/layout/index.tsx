'use client'

import { useState } from "react";
import Sidebar from "../sidebar";
import Header from "../header";

interface IStyledLayout {
    children: React.ReactNode,

}

export default function StyledLayout ({children}: IStyledLayout) {
    const [ sideBarOpen, setSideBarOpen ] = useState<boolean>(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sideBarOpen} setSidebarOpen={setSideBarOpen} />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sideBarOpen} setSidebarOpen={setSideBarOpen} />
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}