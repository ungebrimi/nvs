import { useState, useEffect } from "react"
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useStore } from "../context/StoreContext"


// const convertBreadcrumb = (string: string) => {
//   return string
//     .replace(/-/g, ' ')
//     .replace(/oe/g, 'ö')
//     .replace(/ae/g, 'ä')
//     .replace(/ue/g, 'ü')
//     .toUpperCase();
// };

export default function Breadcrumb({ paths }: any) {

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href={`/`} className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {paths && paths.map((page: any) => (
          <li key={page.href}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <Link
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.breadcrumb}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
