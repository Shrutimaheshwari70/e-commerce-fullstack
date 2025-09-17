


import { useEffect, useState } from "react";
import "../stylesheets/Profile.css";
import { MdCameraEnhance } from "react-icons/md";

import { FaUser } from "react-icons/fa";
function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", userName: "", password: "" , picture:""});
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(true);

const [attempts, setAttempts] = useState(0);
const [lockTime, setLockTime] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // check krra h ki logged in h ya nhi
  useEffect(() => {
    async function checkLogin() {
      let res = await fetch("http://localhost:3000/user/getProfile", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setIsLoggedIn(true);
        setLoggedInUser(data.user);
      }
    }
    checkLogin();
  }, []);

  const handleSignup = async () => {
    if (passwordError) {
      alert("Please enter a strong password before signing up!");
      return;
    }
  const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("userName", form.userName);
    formData.append("password", form.password);
    if (form.picture) {
      formData.append("picture", form.picture); // file append
    }
  try {
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
       
        credentials: "include",
        body: formData,
      });
      const data = await res.json(); 
      if (res.status === 201) {
  
  
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setShowSignup(false);
                alert(data.message || "Signup successful!");
        }, 2000);
      } else {
        
    alert(data.error || data.message || "signup failed")
      }
  } catch (error) {
        console.error(error);
    alert("Something went wrong. Please check your connection.");
  }
  };

  const validatePassword = (value) => {
    const strongPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!strongPassword.test(value)) {
      setPasswordError("⚠️ Enter a strong password");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
     if (lockTime && Date.now() - lockTime < 2 * 60 * 1000) {
    alert("Too many failed attempts. Please try again after 2 minutes.");
    return;
  }
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userName: form.userName, password: form.password }),
    });
    const data = await res.json();

    if (res.ok) {
      setIsLoggedIn(true);
       setAttempts(0);
         const profileRes = await fetch("http://localhost:3000/user/getProfile", {
      method: "GET",
      credentials: "include",
    });
    const profileData = await profileRes.json();
      setLoggedInUser(profileData.user);
    }
    else{
        setAttempts(prev => prev + 1);
        if(attempts+1 >=3){
              setLockTime(Date.now());   
      alert("Too many failed attempts! Try again in 2 minutes.");
      return;
        }
      alert(data.error|| "login failed")
    }
  };

  const handleLogout = async () => {
    const res = await fetch("http://localhost:3000/user/logout", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      setIsLoggedIn(false);
      setLoggedInUser(null);
      setForm({ firstName: "", lastName: "", userName: "", password: "" ,picture:null});
      setShowSignup(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="auth-page">
        <div className="auth-card">


          <div className="auth-panel">
            {loading ? (
              <>
                <div className="small-muted">⏳ Creating your account...</div>
                <div className="loader"><i/></div>
              </>
            ) : (
              <>
                {showSignup && (
                  <div className="form-block">
                    <h2>Signup</h2>
                    <div className="form-grid">
                      <input className="input" placeholder="First Name" onChange={e => setForm({ ...form, firstName: e.target.value })} />
                      <input className="input" placeholder="Last Name" onChange={e => setForm({ ...form, lastName: e.target.value })} />
                      <input className="input" placeholder="Username" onChange={e => setForm({ ...form, userName: e.target.value })} />

           
                      <div style={{ position: "relative" }}>
                        <input
                          className="input"
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          onChange={e => {
                            setForm({ ...form, password: e.target.value });
                            validatePassword(e.target.value);
                          }}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "rgba(250,250,250,0.6)"
                          }}
                        >
                          {showPassword ? "🙈" : "👁️"}
                        </span>
                      </div>

                      {passwordError && (
                        <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                          {passwordError}
                        </p>
                      )}
                      <div className="profile-pic">
     <label htmlFor="">Profile-:</label>
<input type="file" name="" id="" onChange={e => {
                            setForm({ ...form, picture: e.target.files[0] });
    
                          }}/>
                      </div>
                 
                      <button className="btn btn-primary" onClick={handleSignup}>Signup</button>
                    </div>
                  </div>
                )}

                <div className="hr" />

                <div className="form-block">
                  <h2>Login</h2>
                  <div className="form-grid">
                    <input className="input" placeholder="Username" onChange={e => setForm({ ...form, userName: e.target.value })} />

                
                    <div style={{ position: "relative" }}>
                      <input
                        className="input"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "rgba(250,250,250,0.6)"
                        }}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </span>
                    </div>

                    <div className="row">
                      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }


  return (
   

      <div className="auth-page">
    <div className="profile-card">
      <div className="welcome-card">
        <div className="picture-div">
          <FaUser />
      <img src={loggedInUser?.picture} alt="" className="picture"/>
        <button className="edit-icon">
          <MdCameraEnhance />
        </button>
        </div>
  
        <h2>Welcome {loggedInUser?.firstName} {loggedInUser?.lastName}</h2>
        <p className="small-muted">Username: {loggedInUser?.userName}</p>
        <div style={{ marginTop: 12 }}>
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Profile;


