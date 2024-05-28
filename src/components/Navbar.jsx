import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
                <div className="logo font-bold text-2xl">
                    <span className='text-blue-500'>&lt;</span>
                    Pass
                    <span className='text-blue-500'>OP/ &gt;</span>
                </div>
                <a href="https://github.com/sahil1330/pass-local" target='_blank'>
                    <button className='bg-blue-700 text-white my-5 rounded-full flex justify-between items-center ring-white ring-1 '>
                        <img src="icons/github.svg" className='invert p-1  w-10' alt="github logo" />
                        <span className="font-bold px-2">Github</span>
                    </button>
                </a>
            </div>
        </nav>
    )
}

export default Navbar
