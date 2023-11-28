'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Breadcrumb () {
    const {data : session} = useSession();
    const pathName = usePathname();
  return (
    <div className=" flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav>
        <ol className="flex items-center gap-2 exclude-list-styling">
          <li>
            <Link className="font-medium" href={`${session?.user ? '/protected/home' : '/home'}`}>
              Helpdesk 
            </Link>
          </li>
          <li className="font-medium text-primary">{pathName.includes('/protected') ? pathName.replace('/protected', '') : pathName }</li>
        </ol>
      </nav>
    </div>
  );
};
