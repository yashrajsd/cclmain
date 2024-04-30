import axios from 'axios';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://3.94.186.69:3001');

const posts = [
  {
    id: 1,
    username: 'Yashraj',
    tweet: 'Hello world',
  },
  {
    id: 2,
    username: 'John',
    tweet: 'React is awesome!',
  },
];




const Main = () => {
  const [postList, setPostList] = useState(posts);
  const [tweet,setTweet] = useState();
  const [username,setUsername] = useState('Sameer')

  const handleTweet=(e)=>{
    setTweet(e.target.value);
  }

  const getPosts =async()=>{
    const response = await axios.get('http://3.94.186.69:3001/api/getposts')
    setPostList(response.data.posts)
    console.log(response.data)
  }

  useEffect(()=>{
    getPosts();
  },[])

  useEffect(()=>{
    socket.on('newpost',()=>{
      getPosts();
    })
  },[socket])

  const handlePost=async()=>{
    if(!tweet){
      return alert('empty input');
    }
    try{
      const response = await axios.post('http://3.94.186.69:3001/api/post',{username,tweet})
      socket.emit('posted','yay');
      if(response.status==200){
        setTweet('');
        alert('posted');
      }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className='w-full px-[10%] min-h-[100vh] bg-[#101218] pt-[2rem]'>
      <div className='flex justify-between w-full text-white'>
        <span>
          <h1>MTA</h1>
        </span>
        <span>
          <button>Sign Out</button>
        </span>
      </div>
      <div>
        <input
        value={tweet}
          onChange={handleTweet}
          className='w-[90%] bg-[#212531] p-[1rem] rounded-md mt-[2rem] focus:outline-none focus:bg-[#4A567B] poppins-bold text-white'
          placeholder='Enter your tweet'
        />
        <button className='w-[10%] bg-[#1C69FF] p-[1rem] rounded-md text-white poppins-semibold' onClick={handlePost}>
        Submit
        </button>
      </div>
      {postList.length > 0 ? (
        <div className='flex flex-col gap-[1rem] mt-[2rem]'>
          {postList.map((post) => (
            <div key={post.id} className='w-full flex flex-row bg-[rgba(7,11,18,91%)] p-[2rem]'>
              <span className='w-[10%] flex'>
                <span className=' bg-white rounded-full h-fit px-[1rem] py-[0.6rem]' >Y</span>
              </span>
              <span className='w-[90%] text-white'>
                <p className='text-left poppins-bold mb-[0.6em]'>{post.username}</p>
                <p className='text-left poppins-medium'>{post.tweet}</p>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <h1 className='text-white'>No posts yet</h1>
      )}
    </div>
  );
};

export default Main;
