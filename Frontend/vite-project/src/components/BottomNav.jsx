import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './bottomnav.css'

const BottomNav = () => {
  const loc = useLocation()
  return (
    <nav className="bn-nav">
      <Link to="/" className={loc.pathname === '/' ? 'bn-item active' : 'bn-item'}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span>home</span>
      </Link>

      <Link to="/saved" className={loc.pathname === '/saved' ? 'bn-item active' : 'bn-item'}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3h12v18l-6-4-6 4V3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span>saved</span>
      </Link>
      
      <Link to="/user/register" className={loc.pathname === '/user/register' ? 'bn-item active' : 'bn-item'}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 21a9 9 0 0 1 18 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span>signup</span>
      </Link>

      <Link to="/user/login" className={loc.pathname === '/user/login' ? 'bn-item active' : 'bn-item'}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3l-4 4-4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span>Login</span>
      </Link>
      
    </nav>
  )
}

export default BottomNav
