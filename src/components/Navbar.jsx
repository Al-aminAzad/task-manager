import React from 'react';
import { Link } from 'react-router-dom'

// file import 
import logo  from '../assets/images/logo.svg'
import { useDispatch } from 'react-redux';
import { filterTasks } from '../features/filter/filterSlice';

const Navbar = () => {
  const dispatch = useDispatch()
  
  const handleChange=(e)  =>{
    dispatch(filterTasks({searchText:e.target.value}))
  }
  return (
    <nav className="container relative py-3">
    <div className="flex items-center justify-between">
      <Link to='/'>
        <img src={logo} alt='logo' />
      </Link>
      <div className="flex-1 max-w-xs search-field group">
        <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
        <input type="text" placeholder="Search Task" onChange={handleChange} className="search-input" id="lws-searchTask" />
      </div>
    </div>
  </nav>
  )
}

export default Navbar