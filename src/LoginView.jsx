import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "./context/AuthProvider";
import { UserContext } from "./context/UserContext";
// Import Swiper React components

import axios from './api/axios';
import bcrypt from 'bcryptjs';

const LOGIN_URL = 'test/custom_auth';

const LoginView = () => {

    
    
    const userRef = useRef();
    const errRef = useRef()
    const [fetching,setFetching] = useState(false);
    const {user,setUser} = useContext(UserContext)
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, []);
    useEffect(() => {
      localStorage.setItem('user', JSON.stringify(user));
    }, [user]);
    const [page_user,setPageUser] = useState('');
    const [pwd,setPwd] = useState('');
    const [errMsg,setErrmsg] = useState('');
    const [success,setSuccess] = useState(false);

    useEffect(()=>{
      localStorage.setItem('fetching', JSON.stringify(fetching));
      console.log("Fetching set on local storage")
    },[fetching])

    useEffect(() => {
      setErrmsg('');
    }, [user,pwd])
    
    const handleSubmit = async (e) => {
      var curr = new Date()
      console.log("PAGE USER")
      console.log(page_user)
      console.log("USER login")
      console.log(user)
      e.preventDefault();
      const hashedPassword = bcrypt.hashSync(pwd);
      var date_now = new Date
        console.log(date_now)
       
        var first_time_api_date = date_now.getDate()
        if (first_time_api_date < 10){
            first_time_api_date = "0"+first_time_api_date
        }
        var first_time_api_month = date_now.getMonth()+1
        if (first_time_api_month < 10){
            first_time_api_month = "0"+first_time_api_month
        }
      try { 
            // console.log(user,hashedPassword)
          const response = await axios.get(LOGIN_URL, 
            {params:{
              "user":page_user,
              "password":hashedPassword,
              'date':curr.getFullYear()+"-"+first_time_api_month+"-"+first_time_api_date
            }},
            {
              headers: { 'Content-type': 'application/json'},
              withCredentials:true
            });
          setUser(page_user)
          setFetching(true)
          console.log(page_user)
          console.log("DIVIDER")
          
          // const accessToken = response?.data?.accessToken;
          // const roles = response?.data?.roles;
          
          
          setSuccess(true);
      } catch (err) {
        if(!err?.response){
          setErrmsg(process.env.baseURL);
        } else if (err.response?.status === 400){
          setErrmsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setErrmsg('Unauthorized');
        } else {
          setErrmsg('Login Failed');
        }
        errRef.current.focus();
      }
      console.log(user,hashedPassword);
      
      
    }

    return (
        <>
        {success ? (
          <section>
            <h1>
              Hey you are logged In
            </h1>
          </section>
        ):(
          <section className="w-screen h-screen">
          <p ref={errRef} className= {errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
            
          </p>
          
          <form onSubmit={handleSubmit} className="w-[80%] m-auto h-[70%]">
            <div className="w-[100%] p-5">
            <label htmlFor="username">Username:</label>
            <input 
                type="text" 
                id="username"
                ref={userRef}
                autoComplete="Off"
                onChange={(e) => setPageUser(e.target.value)}
                value={page_user}
                required
                />
            </div>
            
            <div className="w-[100%] m-5">
            <label htmlFor="password]">Password:</label>
            <input 
                type="password" 
                id="password"
                ref={userRef}
                autoComplete="Off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                />
            </div>

            <div className="translate-x-[-40%]">
            <button className=" ">Sign In</button>
            </div>
            
            
             
          </form>
        </section>
        )}
        
        </>
        
      );
}

export default LoginView;