import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const user={
    username:'',
    password:'',
    gmail:'',
}

const Registration = ({setSignin}) => {
    const [signIn,setSignIn] = useState(true);
    const [form,setForm] = useState(user);
    const id = 8998;
    const {username,password,gmail} = form;
    const navigate = useNavigate();

    const handleChaneg=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSignIn=async()=>{
      try{
        const response =await axios.post("http://3.94.186.69:3001/api/userlogin",{password,username});
        if(response.status==200){
          localStorage.setItem('token',response.data);
          setSignin(true);
          navigate('/app');
        }
      }catch(error){
        console.log(error);
      }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(signIn){
          handleSignUp();
        }else{
          handleSignIn();
        }

    }

    const handleSignUp=async()=>{
        try{
            alert('working')
            const response = await axios.post('http://3.94.186.69:3001/api/usersignup',{id,username,password,gmail});
            if(response.status==200){
              setSignin(true);
              navigate('/app');
            }
        }catch(error){
            console.log(error);
        }
    }
    
    return (
    <div className='flex flex-row h-[100vh] w-[100vw] bg-[#101218]'>
      <div className='lg:w-[60%] h-full'>

      </div>
      <div className='h-full lg:w-[40%] w-[100%] bg-[#1C69FF] flex justify-center items-center'>
        <div className='bg-[rgba(217,217,217,11%)] w-[80%] h-[80%] rounded-md flex justify-center items-center'>
          <div className='w-full'>
            <div className='text-white mb-[2rem]'>
              <h1 className='poppins-bold'>MAT</h1>
              <p className='popping-medium'>Make A Tweet</p>
            </div>
            <form className='w-full' onSubmit={handleSubmit}>
              {signIn ? (
                <>
                <div className='w-full'>
                <p className='text-[#D2E1FF] text-left px-[15%] mb-[1rem] font-medium'>Username</p>
                <input value={username} onChange={handleChaneg} placeholder='Enter your name' type='name' name='username' className='py-[0.8em] mb-[1rem] rounded-md px-[0.6em] w-[70%] focus:outline-none bg-[#4F8BFF] placeholder-[#BED4FF] font-bold text-white' />
              </div>
              <div className='w-full'>
                <p className='text-[#D2E1FF] text-left px-[15%] mb-[1rem] font-medium'>Password</p>
                <input value={password} onChange={handleChaneg} placeholder='Enter Password' type='password' name='password' className='py-[0.8em] mb-[1rem] rounded-md px-[0.6em] w-[70%]  focus:outline-none bg-[#4F8BFF] placeholder-[#BED4FF] font-bold text-white' />
              </div>
              <div className='w-full'>
                <p className='text-[#D2E1FF] text-left px-[15%] mb-[1rem] font-medium'>Email</p>
                <input value={gmail} onChange={handleChaneg} placeholder='Enter Email Address' type='email' name='gmail' className='py-[0.8em] mb-[1rem] rounded-md px-[0.6em] w-[70%] focus:outline-none bg-[#4F8BFF] placeholder-[#BED4FF] font-bold text-white' />
              </div>
                </>
              ):(
                <>
                <div className='w-full'>
                <p className='text-[#D2E1FF] text-left px-[15%] mb-[1rem] font-medium'>Username</p>
                <input value={username} onChange={handleChaneg} placeholder='Enter your name' type='name' name='username' className='py-[0.8em] mb-[1rem] rounded-md px-[0.6em] w-[70%] focus:outline-none bg-[#4F8BFF] placeholder-[#BED4FF] font-bold text-white' />
              </div>
              <div className='w-full'>
                <p className='text-[#D2E1FF] text-left px-[15%] mb-[1rem] font-medium'>Password</p>
                <input value={password} onChange={handleChaneg} placeholder='Enter Password' type='password' name='password' className='py-[0.8em] mb-[1rem]  rounded-md px-[0.6em] w-[70%] focus:outline-none bg-[#4F8BFF] placeholder-[#BED4FF] font-bold text-white' />
              </div>
                </>
              )}
              <div>
                <button type='submit' className='bg-[#10175C] p-[0.8em] w-[70%] text-white rounded-md mt-[1rem]'>Create Account</button>
              </div>
            </form>
            <p className=' text-[0.8rem] text-white mt-[1rem] cursor-pointer'>Already have an account? <span className='font-bold' onClick={()=>{setSignIn(!signIn)}}>Sign In</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
