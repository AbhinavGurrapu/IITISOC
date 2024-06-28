import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'



export default function HomePage() {
  return (
    <body className='bg-sky-500 h-full'>
        <div className="bg-gradient-to-r from-indigo-500 to-sky-500  h-14 flex justify-between px-4">
          <p className="text-4xl font-serif pt-2 px-2 font-semibold">CodeBlitz</p>
          <ul className="flex justify-end">
        
         <li className="cursor-pointer px-5 py-4 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl">Home</li>
         
            <li className="cursor-pointer px-5 py-4 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl">Practice</li>
            <li className="cursor-pointer px-5 py-4 hover:bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl">Help</li>
           <div className='flex justify-center pt-4 text-2xl cursor-pointer'> <i className="fa-solid fa-user cursor-pointer "></i></div>
            <select name=''  className='bg-transparent cursor-pointer  border-none pt-3'>
            <option value="My Profile" >My Profile</option>
            <option value="Edit Profile">Edit Profile</option>
            <option value="Report a Bug" >Report a Bug</option>
            <option value="Sign Out" >Sign Out</option>
            </select>
            
          </ul>
        </div>

        <h1 className='font-mono font-extrabold text-left text-3xl pt-16 pl-16'>Looking For Contests?</h1>
        
        <main className='p-16 pb-40' >
         <div className='container grid gap-4 auto-cols-fr grid-cols-2' >

          <div className='box shadow-md rounded-md bg-sky-300 text-center'>
            <h1 className='font-serif font-extrabold '>CodeChef</h1>
            <img className='h-20 pl-44' src='chef.png' alt='' ></img>
            
            <p>for Contests in code forces</p>
            <a className= 'font-sans font-semibold rounded underline' href='https://www.codechef.com/contests' target='_blank'>ClickHere</a>
          </div>
 

          <div className='box shadow-md rounded-md bg-sky-300 text-center'>
            <h1 className='font-serif font-extrabold '>AtCoder</h1>
            <img className='h-20 pl-60' src='atcoder.png' alt='' ></img>
            
            <p>for Contests in AtCoder</p>
            <a className= 'font-sans font-semibold rounded underline' href='https://atcoder.jp/contests/' target='_blank'>ClickHere</a>
          </div>


          <div className='box shadow-md rounded-md bg-sky-300 text-center'>
            <h1 className='font-serif font-extrabold '>CodeForces</h1>
            <img className='h-20 pl-24' src='forces.png' alt=''></img>
            
            <p>for Contests in CodeForces</p>
            <a className= 'font-sans font-semibold rounded underline' href='https://codeforces.com/contests' target='_blank'>ClickHere</a>
          </div>


          <div className='box shadow-md rounded-md bg-sky-300 text-center'>
            <h1 className='font-serif font-extrabold '>GeeksforGeeks</h1>
            <img className='h-20 pl-52' src='geeks.png' alt=''></img>
            
            <p>for Contests in GeeksforGeeks</p>
            <a className= 'font-sans font-semibold rounded underline' href='https://www.geeksforgeeks.org/contests/' target='_blank'>ClickHere</a>
          </div>
          <div className='box shadow-md rounded-md bg-sky-300 text-center'>
            <h1 className='font-serif font-extrabold '>LeetCode</h1>
            <img className='h-20 pl-52' src='image.png' alt=''></img>
            
            <p>for Contests in LeetCode</p>
            <a className= 'font-sans font-semibold rounded underline' href='https://leetcode.com/contest/' target='_blank'>ClickHere</a>
          </div>
          </div>



        <div className='pt-40 pl-3'><Card border="primary" style={{ width: '18rem' }}>
        <Card.Header className='bg-sky-700 font-extrabold'>QUESTION</Card.Header>
        <Card.Body className='bg-sky-300'>
          <Card.Title>Here's the question of the day</Card.Title>
        <Card.Text>
            checkout the question of the day by
            <br/>
            <a href='https://www.geeksforgeeks.org/problems/reverse-words-in-a-given-string/0' target='_blank' className='bg-sky-700 rounded font-bold' >Clicking Here</a>
        </Card.Text>
         </Card.Body>
         </Card>
      <br /></div>





          </main>

          <footer>
            <div className='bg-indigo-950  text-slate-200  text-sm flex justify-center'>
                <p>CopyRight</p>
                <i class="fa-regular fa-copyright pt-1"></i>
                <p className='pr-20 pl-0'>2024 CodeBlitz</p>
                <ul className='flex space-x-8 cursor-pointer '>
                    <li  className='hover:underline'>Contact Us</li>
                    <li className='hover:underline'>Privacy Policy</li>
                    <li className='hover:underline'>Terms</li>
                    <li className='hover:underline'>Other Policy</li>
                    <li className='hover:underline'>Help Center</li>
                </ul>
               
            </div>
           

          </footer>
          
      </body>
  )
}
