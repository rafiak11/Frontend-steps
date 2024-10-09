import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom'; 
import Logo from '../images/logo.png' 
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai" 
import {UserContext} from '../context/userContext.js'

import '../style.css';
import '../bootstrap.css';
import '../responsive.css';
import '../style.scss';

const Navbar = () => { 
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth >800 ? true : false);

  const {currentUser} = useContext(UserContext)

  const closeNavHandler =() => { 
    if(window.innerWidth < 800){ 
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  }
  return (
    <header className="header_section">
      <div className="container1">
        <nav className="navbar navbar-expand-lg custom_nav-container ">
          <Link className="navbar-brand" to="/">
            {/* <img src="images/logo.png" alt="" /> */}
            <span>
              STEPS
            </span>
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="s-1"> </span>
            <span className="s-2"> </span>
            <span className="s-3"> </span>
          </button>

          <button className="button">
            Register
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
            { currentUser?.id && isNavShowing && <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>{currentUser?.name}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create" onClick={closeNavHandler}>Create Post</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/authors" onClick={closeNavHandler}>Authors</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout" onClick={closeNavHandler}>Logout</Link>
                </li>
              </ul> } 
              {!currentUser?.id && isNavShowing && <ul className="navbar-nav">
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/authors" onClick={closeNavHandler}>Authors</Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={closeNavHandler}>Admin Login</Link>
                </li>
              </ul> } 
              <button className='nav__toggle-btn' onClick={() => setIsNavShowing(!isNavShowing)}> 
        {isNavShowing ? <AiOutlineClose/> : <FaBars/>}  
       </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

