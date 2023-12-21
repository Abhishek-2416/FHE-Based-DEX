import React from 'react'

type Props = {}

const Header = (props: Props) => {
    return (
        <header className="text-gray-400 fixed bg-transparent z-50 w-full body-font">
            <div className="container p-4 md:p-[20px]">
                <div className="flex flex-wrap rounded-3xl overflow-hidden p-5 flex-row md:flex-row items-center bg-[#ff00d905] backdrop-blur-[100px] justify-between">
                    <a className="flex title-font font-medium items-center text-white mb-0">
                        <span className="ml-3 text-xl"> 💰 DexFund </span>
                    </a>
                    <button className="inline-flex items-center bg-[#0f0f0f20] backdrop-blur-3xl text-[#ff68fa] border-2 border-[#ff68fa60] py-2 px-4 drop-shadow-[0px_0px_5px_#8bdce040] focus:outline-none hover:bg-[#ff68fa20] hover:drop-shadow-[0px_0px_10px_#ff68fa40] transition-all rounded-xl text-base mt-0">
                        Connect Wallet
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header