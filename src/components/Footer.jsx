import React from 'react'
import { home_page } from '../data/home_page_Data'


function Footer() {
  return (
    <footer className="bg-[#3DCED4] py-6 px-4 border-t border-neutral-300">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 text-center">

        {/* Copyright / Footer Text */}
        <p className="text-sm text-gray-700 leading-snug">
          <strong className="font-bold tracking-wide">SMARK </strong>
          {home_page?.footer}
        </p>

        {/* Contact Details */}
        {(home_page?.contact || home_page?.email) && (
          <address className="not-italic flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-600">
            {home_page?.contact && (
              <a
                href={`tel:${home_page.contact}`}
                className="hover:text-cyan-600 transition-colors duration-200 flex items-center gap-1"
              >
                <span className="font-semibold text-gray-800">Phone:</span>{" "}
                {home_page.contact}
              </a>
            )}

            {home_page?.contact && home_page?.email && (
              <span className="hidden sm:inline text-gray-400">•</span>
            )}

            {home_page?.email && (
              <a
                href={`mailto:${home_page.email}`}
                className="hover:text-cyan-600 transition-colors duration-200 flex items-center gap-1"
              >
                <span className="font-semibold text-gray-800">Email:</span>{" "}
                {home_page.email}
              </a>
            )}
          </address>
        )}

      </div>
    </footer>
  )
}

export default Footer