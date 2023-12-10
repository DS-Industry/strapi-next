'use client'

import React, { useState } from "react";

interface ITabs {
    label?: string,
    children: any
}

export default function Tabs ({ children }: ITabs) {

    const [activeTab, setActiveTab] = useState((children[0] as React.ReactElement<ITabs>).props.label);

    const handleClick = (e : React.MouseEvent<HTMLButtonElement>, newActiveTab: string) => {
      e.preventDefault();
      setActiveTab(newActiveTab);
    };

    return (
        <div className=" w-full pt-3">
        <div className="flex border-b border-gray-300">
          {children.map((child: any) => (
            <button
              key={child.props.label}
              className={`${
                activeTab === child.props.label ? 'border-b-2 border-purple-500' : ''
              } flex-1 text-gray-700 font-medium py-2`}
              onClick={e => handleClick(e, child.props.label)}
            >
              {child.props.label}
            </button>
          ))}
        </div>
        <div className="py-4">
          {children.map((child: any) => {
            if (child.props.label === activeTab) {
              return <div key={child.props.label}>{child.props.children}</div>;
            }
            return null;
          })}
        </div>
      </div>
    )
}