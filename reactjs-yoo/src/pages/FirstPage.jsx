import React from 'react'
import { Link } from 'react-router-dom'

export default function landingpage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>landing page</title>
        {/* Include Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 h-14 flex justify-between">
          <p className="text-4xl font-serif pt-2 px-2 font-semibold">CodeBlitz</p>
          <ul className="flex justify-end">
            <li className="cursor-pointer px-5 py-4 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl text-xl font-semibold">Compete</li>
            <li className="cursor-pointer px-5 py-4 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl text-xl font-semibold">Practice</li>
            <li className="cursor-pointer px-5 py-4 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl text-xl font-semibold">Contests</li>
         <Link to="/SignIn">   <li className="cursor-pointer px-5 py-4 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl text-xl font-semibold">Login</li></Link>
          </ul>
        </div>
        <main className="bg-sky-500 flex">
          <div className="h-96 pt-40">
            <p className="text-3xl font-semibold pl-16">Know All About The Contests</p>
            <p className="w-0.125 m-10">
              Gives info about the contests on various sites such as Codeforces, AtCoder, LeetCode, CodeChef, and GeeksForGeeks
            </p>
            <div className="pl-40 m-10 font-medium">
            <Link to="SignUp">  <button className="bg-indigo-500 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl">Create Account {'>'}</button></Link>
            </div>
          </div>
          <div className="flex items-center">
            <img src="Untitled design.png" alt="Design" className="h-fit" />
          </div>

        </main>
      </body>
    </html>
  )
}