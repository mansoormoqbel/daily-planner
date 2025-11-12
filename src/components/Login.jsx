import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";




export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login successful");
      navigate("/");
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <div >
    <form onSubmit={login} className="  login-box">
        <h3>Login</h3>
        <div className="user-box">
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"  />
        </div>
        <div className="user-box">
            <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
        </div>
      
      <button type="submit">Sign In</button>
      {error && <p style={{color:"red"}}>{error}</p>}
    </form>
    </div>
    </>
  );
}
