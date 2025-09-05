


import { useEffect, useState } from "react";
import "../stylesheets/Profile.css";

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", userName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(true);


  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    const res = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (res.status === 201) {
      let data = await res.json();
      alert(data.message);

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowSignup(false);
      }, 2000);
    } else {
      let data = await res.json();
      console.log(data);
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
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userName: form.userName, password: form.password }),
    });
    const data = await res.json();

    if (res.ok) {
      setIsLoggedIn(true);
      setLoggedInUser(data.user);
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
      setForm({ firstName: "", lastName: "", userName: "", password: "" });
      setShowSignup(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="brand-panel">
            <div className="brand-logo"><span className="dot" /> SHOP HERE</div>
            <div className="brand-hero">Premium Streetwear · New Season Drop</div>
            <div className="brand-sub small-muted">
              Quality fabrics. Responsible stitching. Wear the story — curated for urban comfort.
            </div>
          </div>

          <div className="auth-panel">
            {loading ? (
              <>
                <div className="small-muted">⏳ Creating your account...</div>
                <div className="loader"><i /></div>
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

                      <button className="btn btn-primary" onClick={handleSignup}>Signup</button>
                    </div>
                  </div>
                )}

                <div className="hr" />

                <div className="form-block">
                  <h2>Login</h2>
                  <div className="form-grid">
                    <input className="input" placeholder="Username" onChange={e => setForm({ ...form, userName: e.target.value })} />

                    {/* Password with toggle (login) */}
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
    <div className="auth-page center">
      <div className="auth-card" style={{ maxWidth: 640 }}>
        <div className="brand-panel">
          <div className="brand-logo"><span className="dot" /> TAILS EMPIRE</div>
        </div>

        <div className="auth-panel">
          <div className="welcome-card">
            <h2>Welcome {loggedInUser?.firstName} {loggedInUser?.lastName}</h2>
            <p className="small-muted">Username: {loggedInUser?.userName}</p>
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
