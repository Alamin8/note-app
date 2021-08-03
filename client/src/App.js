import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Login from './components/Login';
import Notes from './components/Notes';


const App = () => {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(()=>{
    const checkLogin = async ()=>{
      const token =localStorage.getItem('tokenStore')
      if(token){
        const verified = await axios.get('/users/verify', {
          headers:{Authorization:token}
        })
        console.log(verified);
        setIsLogin(verified.data)//this data return a status that authentiction is true or false
        if(verified.data===false) return localStorage.clear()
      }else{
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <>
      {
        isLogin ? <Notes setIsLogin={setIsLogin} /> : <Login setIsLogin={setIsLogin} />
      }
    </>
  );
};

export default App;
