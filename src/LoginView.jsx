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
      try { 
            // console.log(user,hashedPassword)
          const response = await axios.get(LOGIN_URL, 
            {params:{
              "user":page_user,
              "password":hashedPassword,
              'date':curr.getFullYear()+"-"+curr.getMonth()+1+"-"+curr.getDate()
            }},
            {
              headers: { 'Content-type': 'application/json'},
              withCredentials:true
            });
          setUser(page_user)
          
          console.log(page_user)
          console.log("DIVIDER")
          
          // const accessToken = response?.data?.accessToken;
          // const roles = response?.data?.roles;
          
          
          setSuccess(true);
      } catch (err) {
        if(!err?.response){
          setErrmsg('No Server Response');
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
          <section>
          <p ref={errRef} className= {errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
            
          </p>
          
          <form onSubmit={handleSubmit}>
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
            <label htmlFor="password]">Password:</label>
            <input 
                type="text" 
                id="password"
                ref={userRef}
                autoComplete="Off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                />
              <button>Sign In</button>
          </form>
        </section>
        )}
        
        </>
        
      );
}

export default LoginView;