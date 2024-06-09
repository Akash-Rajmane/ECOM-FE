import React from 'react';
import {Link}  from 'react-router-dom'

const Section = ({title,links}) => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center w-100'>
        <h4 className='m-auto'>{title}</h4>
        <ul className='m-0 p-0 list-unstyled'>
        {links.map((el)=>{
            return (
                <li key={el.id} className='my-1'><Link  to={el.link}  className='link-underline-opacity-0 link-offset-3-hover link-secondary link-underline-opacity-100-hover'>{el.text}</Link></li>
            )
        })}
        </ul>
    </div>
  )
}

export default Section;