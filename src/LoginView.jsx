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
    
    // const [user,setUser] = useState('');
    const [pwd,setPwd] = useState('');
    const [errMsg,setErrmsg] = useState('');
    const [success,setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
      setErrmsg('');
    }, [user,pwd])
    const handleClick = async (e) => {
      axios.get(LOGIN_URL);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const hashedPassword = bcrypt.hashSync(pwd);
      try { 
            // console.log(user,hashedPassword)
          const response = await axios.get(LOGIN_URL, 
            {params:{
              "user":user,
              "password":hashedPassword
            }},
            {
              headers: { 'Content-type': 'application/json'},
              withCredentials:true
            });
          setUser(user)
          
          console.log(user)
          console.log("DIVIDER")
          
          // const accessToken = response?.data?.accessToken;
          // const roles = response?.data?.roles;
          setUser('');
          setPwd('');
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
      setUser('');
      
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
                // onChange={(e) => setUser(e.target.value)}
                // value={user}
                required
                />
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
              <button>Sign In</button>
          </form>
        </section>
        )}
        
        </>
        
      );
}

export default LoginView;