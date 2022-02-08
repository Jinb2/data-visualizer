import { Fragment, useState } from "react";
import "../styles/register.css";

const Register = ({ setAuth }) => {
  // state for the inputs to the form
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  // parse information
  const { email, password, name } = inputs;

  // add to our state
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // when user submits
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // form data to be submitted
      const body = { email, password, name };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // jwt token for user
      const jwtToken = await response.json();

      // send user to login page after getting jwt token
      setAuth(true);

      // stores this jwt token
      localStorage.setItem("token", jwtToken.token);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          className="form-control my-3"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control my-3"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control my-3"
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
    </Fragment>
  );
};

export default Register;
