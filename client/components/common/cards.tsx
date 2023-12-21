import React, { ReactNode } from 'react'

type Props = {
    title: String,
    component: ReactNode,
}

const Cards = ({title, component}: Props) => {
    return (
        <div className="flex rounded-3xl h-full bg-[#0f0f0f75] w-80 md:w-96 backdrop-blur-sm p-8 flex-col">
            <div className="flex items-center mb-5">
                <div className="w-12 h-12 mr-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-white text-lg title-font font-medium">{title}</h2>
                    <p className='text-sm text-gray-100'></p>
                </div>
            </div>
            <div className="flex-grow">
                {component}
            </div>
        </div>
    )
}

export default Cards