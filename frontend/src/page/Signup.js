import React, { useState } from 'react'
import loginSignupImage from '../assest/login-animation.gif'
import { BiShow, BiHide } from 'react-icons/bi'
import { Link  , useNavigate} from 'react-router-dom'
import {ImagetoBase64} from '../utility/ImagetoBase64';


const Signup = () => {

        const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image :""
    })

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev)
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploardProfileImage =async(e)=>{
        
        const data =await ImagetoBase64(e.target.files[0])
        console.log(data)
        setData((preve)=>{
            return {
                ...preve,
                image : data
            }

        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { firstName, email, password, confirmPassword } = data
        if (firstName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                alert("Successful")
                navigate("/login")
            } else {
                alert("Password and confirm password do not match")
            }
        } else {
            alert("Please enter all required fields")
        }
    }

    return (
        <div className='p-3 md:p-4'>
            <div className='flex flex-col w-full max-w-sm p-4 m-auto bg-white'>
                <div className='relative flex items-center w-20 h-20 m-auto overflow-hidden rounded-full shadow-md 20 drop-shadow-md'>
                    <img src={  data.image ? data.image:loginSignupImage} alt='' className='w-full h-full' />
                    <label htmlFor='profileImage' className='absolute bottom-0 w-full text-center bg-opacity-50 cursor-pointer bg-slate-500 h-1/3'>
                 <div >
                  <p className='p-1 text-sm text-white cursor-pointer'>Upload</p>
                  </div>
                  <input type='file' id='profileImage' accept='image/*' className='hidden' onChange={handleUploardProfileImage} />
            
                 </label>
        

                </div>
                <form className='flex flex-col w-full py-3' onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' id='firstName' name='firstName' className='w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-400' value={data.firstName} onChange={handleOnChange} />

                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' id='lastName' name='lastName' className='w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-400' value={data.lastName} onChange={handleOnChange} />

                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' className='w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-400' value={data.email} onChange={handleOnChange} />

                    <label htmlFor='password'>Password</label>
                    <div className='flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300'>
                        <input type={showPassword ? 'text' : 'password'} id='password' name='password' className='w-full border-none outline-none bg-slate-200' value={data.password} onChange={handleOnChange} />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <div className='flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300'>
                        <input type={showConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' className='w-full border-none outline-none bg-slate-200' value={data.confirmPassword} onChange={handleOnChange} />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <button type='submit' className='max-w-[150px] w-full m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign Up</button>
                </form>
                <p className='mt-2 text-sm text-left'>Already have an account? <Link to='/login' className='text-red-500 underline'>Login</Link></p>
            </div>
        </div>
    )
}

export default Signup
