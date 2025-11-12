import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <div>
      <form onSubmit={register} className="  login-box">
        <h3>Register</h3>
        <div class="user-box">
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"  />
          </div>
          <div class="user-box">
              <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
          </div>
        
        
        <button type="submit">Sign Up</button>
        {error && <p style={{color:"red"}}>{error}</p>}
      </form>
    </div>
    </>
    
  );
}
