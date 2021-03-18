import React,{Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from "../auth/helper/index";


const Navbar = ({history, path}) => {

    const activeTab = (history, path) => {
      if(history.location.pathname === path) {
        return {color: "#000"}
      }else{
        return {color: "#f00"}
      }
    }
    return (
        <div>    	
<nav className="navbar navbar-expand-lg navbar-light shadow bg-light mb-3">
  <div className="container">
    <a className="navbar-brand" href="#"></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        
        <li className="nav-item">
          <Link className="nav-link  nav-cart" 
          style={activeTab(history,"/")}
          aria-current="page" to="/">
          <i className="fa fa-home nav-cart" aria-hidden="true"></i>
          &nbsp;Home</Link>
        </li>
        <li className="nav-item nav-cart">
          <Link className="nav-link" style={activeTab(history,"/about/")} to="/about/">
          <i className="fa fa-info-circle nav-cart" aria-hidden="true"></i>
          &nbsp;About</Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link nav-cart" style={activeTab(history,"/contact/")} to="/contact/">
          <i className="fa fa-phone nav-cart" aria-hidden="true"></i>
          &nbsp;Contact</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link nav-cart" style={activeTab(history,"/cart/")} to="/cart/">
             <i className="fa fa-shopping-cart nav-cart" aria-hidden="true">
              &nbsp;Cart
             </i>
          </Link>
        </li>
        {isAuthenticated() && (
          <li className="nav-item">

          <Link className="nav-link nav-cart" style={activeTab(history,"/user/dashboard/")} to="/user/dashboard/">
             <i className="fa fa-user-circle-o nav-cart" aria-hidden="true"></i>
            &nbsp;Dashboard
          </Link>
        </li>
          )}
      </ul>
      {!isAuthenticated() && (
         <Fragment>
               
      <Link className="nav-link " to="/signin/">
       <span className="btn btn-dark" style={{ borderRadius:"0px" }}>
        Login / Signup
      </span>
     </Link>
    
         </Fragment>

        )}
    {isAuthenticated() && ( 
     <li className="nav-link">
       <span className="btn btn-dark" 
   onClick={() => {
            signout(() => {
                history.push("/")
            })
        }}
       style={{ borderRadius:"0px" }}>
        Logout
      </span>
     </li>
    )}

    </div>
  </div>
</nav>	
        </div>
    );
};


export default withRouter(Navbar);
