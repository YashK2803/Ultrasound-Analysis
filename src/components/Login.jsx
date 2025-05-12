import React from 'react'
import Laptop from '../assets/laptop-nobg.png'

const Login = () => {
    return(
        <div className='relative w-full py-16 overflow-hidden'>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <img src={Laptop} alt="/"/>
            </div>
        </div>
    )
}

export default Login