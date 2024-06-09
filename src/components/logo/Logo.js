import React from 'react';
import "./Logo.css";

const Logo = ({size=35,fontSize="18px"}) => {
  return (
    <div className='d-flex align-items-center'>
        <img src={`https://img.icons8.com/?size=${size}&id=e40ERdqR9nQr&format=png&color=000000`} alt='logo'/>
        <div className='fw-bold logo' style={{fontSize}}>E-COM</div>
    </div>
  )
}

export default Logo;