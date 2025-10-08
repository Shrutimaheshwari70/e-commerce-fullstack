import { TiShoppingCart } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "../stylesheets/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const cartCount = useSelector(
    state => (state.cart?.products || []).reduce((sum, p) => sum + (p.qty || 1), 0)
  );
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Backend se login check aur user info fetch
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/user/getProfile", {
          method: "GET",
          credentials: "include", // cookies ke liye
        });
        const data = await res.json();
        if (res.ok && data.user) {
          const name = data.user.firstName + " " + data.user.lastName;

          dispatch({
            type: "set-user",
            payload: {
              id: data.user._id,
              name,
              email: data.user.email,
            },
          });
        } else {
          setUserName("");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUserName("");
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <div className='navbar-container'>
      <div className="left"><p>Shop Here</p></div>
      <div className="center">
        <Link to="/shop"><button className={location.pathname==="/shop"?"active":""}>Shop</button></Link>
        <Link to="/shop/men"><button className={location.pathname==="/shop/men"?"active":""}>Men</button></Link>
        <Link to="/shop/women"><button className={location.pathname==="/shop/women"?"active":""}>Women</button></Link>
        <Link to="/shop/kids"><button className={location.pathname==="/shop/kids"?"active":""}>Kids</button></Link>
      </div>
      <div className="right">
        <Link to="/cart">
          <button className={location.pathname==="/cart"?"active":""}>
            <TiShoppingCart /><sup>{cartCount}</sup>
          </button>
        </Link>
        <Link to="/profile">
          <button className={location.pathname==="/profile"?"active":""}>
            <CgProfile /> {userName ? `Hi, ${userName}` : ""}
          </button>
        </Link>
      </div>
    </div>
  );
}
