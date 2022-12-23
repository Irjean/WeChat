import React from 'react'

function OnlineUser(props) {
  return (
    <div className='user'>
      <div className='status-container'>
        <div className={`status ${props.status}`}></div>
      </div>
      <span>{props.name}</span>
      <div className='user-img-container'>
        <img src={props.img} alt="profile" referrerPolicy='no-referrer' />
      </div>
    </div>
  )
}

export default OnlineUser