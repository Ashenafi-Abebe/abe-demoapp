import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responsMessage, setResponseMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // create an object with the employee data
    const data = {
      email: email,
      password: password,
    };
    fetch("http://localhost:4000/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setResponseMessage(data.message);
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
          setResponseMessage("Login success");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <div className="notice">
        <h2>{responsMessage}</h2>
      </div>

      <form>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="loginButton" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
