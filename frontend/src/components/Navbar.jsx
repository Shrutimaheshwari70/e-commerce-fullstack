
import { TiShoppingCart } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import "../stylesheets/Navbar.css"
import { Link, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux"
export default function Navbar() {
    const location = useLocation()
const cartCount=  useSelector(state=>state.cart.productCount)
  return (
    <div className='navbar-container'>
        <div className="left">
            <p>Shop Here</p>
        </div>
        <div className="center">
        <Link to="/shop">
         <button className={location.pathname === "/shop" ? "active" : ""}>Shop</button>
        </Link> 
        <Link to="/shop/men">
         <button className={location.pathname === "/men" ? "active" : ""}>Men</button>
        </Link>  
           <Link to="/shop/women">
            <button className={location.pathname === "/women" ? "active" : ""}>Women</button>
           </Link>
           <Link to="/shop/kids">
                  <button className={location.pathname === "/kids" ? "active" : ""}>Kids</button>
           </Link>
     
        </div>
        <div className="right">
          <Link to="/cart">
             <button className={location.pathname==="/cart"?"active":""}><TiShoppingCart />
            <sup>
              {cartCount}
            </sup>
            </button>
          </Link>
         
        <Link to="/profile"> 
        <button className={location.pathname==="/profile"?"active":""}><CgProfile /></button>
        </Link>    
        </div>
    </div>
  )
}

// localhost:5173/