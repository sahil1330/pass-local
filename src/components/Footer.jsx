import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='flex flex-col gap-2 bg-slate-800 justify-center items-center text-white  w-full'>
                <div className="logo font-bold text-2xl">
                    <span className='text-blue-500'>&lt;</span>
                    Pass
                    <span className='text-blue-500'>OP/ &gt;</span>
                </div>
                <div className='flex'>

                Created with <span><img src="icons/heart.png" className='mx-2' width={23} alt="heart" /> </span> by Sahil
                </div>
            </div>
        </>
    )
}

export default Footer
