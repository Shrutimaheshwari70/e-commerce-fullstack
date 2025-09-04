import { useEffect, useState } from "react";

function App() {
const [isloggedin, setIsloggedin] = useState(false)

 
  useEffect(() => {
    // fetch("http://localhost:3000/user/getProfile", {
    //   method: "GET",
    //   credentials: "include", 
    // })
    //   .then(res => res.json())
    //  if(res.ok){

    //  }
    //   .catch(() => setPage("auth"));

    async function isLoggedIn(){
      let res= await fetch("http://localhost:3000/user/getProfile", {
      method: "GET",
      credentials: "include", 
    })

    if(res.ok){
setIsloggedin(true)
    }
    }
  }, []);

 
  const handleSignup = async () => {
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setPage(data.page);
    setUser(data.user);
  };

  // 🔹 Login
  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userName: form.userName, password: form.password }),
    });
    const data = await res.json();
    setPage(data.page);
    setUser(data.user);
  };

  // 🔹 Logout
  const handleLogout = async () => {
    const res = await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    setPage(data.page);
    setUser(null);
  };

  // 🔹 UI
  if (page === "loading") return <h2>Loading...</h2>;

  if (page === "auth") {
    return (
      <div>
        <h2>Signup</h2>
        <input placeholder="First Name" onChange={e => setForm({ ...form, firstName: e.target.value })} />
        <input placeholder="Last Name" onChange={e => setForm({ ...form, lastName: e.target.value })} />
        <input placeholder="Username" onChange={e => setForm({ ...form, userName: e.target.value })} />
        <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button onClick={handleSignup}>Signup</button>

        <h2>Login</h2>
        <input placeholder="Username" onChange={e => setForm({ ...form, userName: e.target.value })} />
        <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  if (page === "profile") {
    return (
      <div>
        <h2>Welcome {user?.firstName} {user?.lastName}</h2>
        <p>Username: {user?.userName}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
}

export default App;
