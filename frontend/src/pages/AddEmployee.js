import React, { useState } from "react";

function AddEmployee(props) {
  // declare state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // create an object with the employee data
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    // send the data to the server
    const url = "http://localhost:4000/add-employee";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = fetch(url, requestOptions);
    response
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First name:</label>
        <br />
        <input
          type="text"
          id="fname"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          name="fname"
        />
        <br />
        <label htmlFor="lname">Last name:</label>
        <br />
        <input
          type="text"
          id="lname"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          name="lname"
        />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          name="email"
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          name="password"
        />
        <br />
        <br />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
