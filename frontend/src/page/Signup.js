import React, { useState } from 'react'
import loginSignupImage from '../assest/login-animation.gif'
import {BiShow, BiHide} from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Signup = () => {

    const [showPassword , setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false)
    const[data,setData] = useState({
        firstName :"",
        lastName :"",
        enail :"",
        password:"",
        confirmPassword:"",
    })
    const handleShowPassword =() => {
        setShowPassword(preve =>!preve )
    }
    
    const handleShowConfirmPassword =() => {
        setShowConfirmPassword(preve =>!preve )
    }
    console.log(data)
    const handleOnChange =(e)=>{
        const {name ,value} = e.traget
        setData((preve) => {
            return{
                ...preve,
                [name]:value
            }
        })
    }

    const handleSubmit =(e)=>{
        e.preventDefault()

    }
  return (
    <div className='p-3 md:p-4'> 
        <div className='flex flex-col w-full max-w-sm p-4 m-auto bg-white'>
            {/* <h1 className='text-2xl font-bold text-center'>Sign Up</h1> */}
            <div className='flex items-center w-20 m-auto overflow-hidden rounded-full shadow-md drop-shadow-md'>
                   <img src={loginSignupImage} alt='' className='w-full'/>
            </div>
            <form className='flex flex-col w-full py-3'onSubmit={handleSubmit}>
                <label htmlFor='firstName' >First Name</label>
                <input type={'text'}id='firstName '  name='firstName' className='w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-400' value={data.firstName} onChange={handleOnChange} />

                <label htmlFor='lastName' >Last Name</label>
                <input type={'text'}id='lastName '  name='lastName' className='w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-400' value={data.lastName} onChange={handleOnChange}/>

                <label htmlFor='email' >Email</label>
                <input type={'email'}id='email '  name='email' className='w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-400' value={data.email} onChange={handleOnChange} />

                <label htmlFor='password' >Password</label>
                <div className='flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300'>
                   <input type={showPassword ? 'text':'password' } id='password' name='password' className='w-full border-none outline-none bg-slate-200' value={data.password} onChange={handleOnChange} />
                   <span className='flex text-xl cursor-pointer ' onClick={handleShowPassword}  >{showPassword  ?<BiShow /> :<BiHide />}</span>
                 </div>

                 <label htmlFor='confirmpassword' >Conform Password</label>
                <div className='flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300'>
                   <input type={showConfirmPassword ? 'text':'password' } id='confirmpassword' name='confirmpassword' className='w-full border-none outline-none bg-slate-200' value={data.confirmPassword} onChange={handleOnChange} />
                   <span className='flex text-xl cursor-pointer ' onClick={handleShowConfirmPassword}  >{showConfirmPassword  ?<BiShow /> :<BiHide />}</span>
                 </div>

                 <button type='submit' className='max-w-[150px] w-full m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign Up</button>

            </form>
            <p className='mt-2 text-sm text-left'>Already have an account? <Link to='/login' className='text-red-500 underline'>Login</Link></p>

        </div>
      
    </div>
  )
}

export default Signup
