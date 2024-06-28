import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div>
       <div className="flex h-screen bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 justify-center">
    <div className="bg-blue-800 h-auto w-80 text-center p-8 rounded-lg">
        <p className="text-4xl font-serif ">Create your CodeBlitz Account</p>
        <input type="text" placeholder="Username" className="border-2 border-black rounded-md cursor-text mt-4 px-2 py-1 w-full" />
        <input type="text" placeholder="E-mail" className="border-2 border-black rounded-md cursor-text mt-4 px-2 py-1 w-full" />
        <input type="password" placeholder="Password" className="border-2 border-black rounded-md cursor-text mt-4 px-2 py-1 w-full" />
        <input type="password" placeholder="Confirm Password" className="border-2 border-black rounded-md cursor-text mt-4 px-2 py-1 w-full" />
       <label> <input type="checkbox" className='cursor-pointer' />I agree to <a href='/' className='text-blue-500 underline '>terms and conditions</a></label>
        <div>
          <Link to="/HomePage">  <button className="bg-blue-500 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded cursor-pointer mt-4 px-4 py-2 w-full">Create Account</button></Link>
        </div>
        
    </div>
    <img src="new.png" alt="Logo" className="w-auto h-100" />
</div>
    </div>
  )
}
