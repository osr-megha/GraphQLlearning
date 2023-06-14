import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqloperations/mutations";

const Login = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("")
  //   const [password, setPassword] = useState("")

  const [formData, setFormData] = useState({});

  const [signinUser, { loading, error, data }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token);
      navigate("/");
    },
  });

  if (loading) return <h1>Loading</h1>;

  // if(data){
  //   localStorage.setItem("token",data.user.token)
  //   navigate("/")
  // }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
  };

  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      <h5>Login!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          // value={email}
          // onChange={(e)=>setEmail(e.target.value)}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          // value={password}
          // onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <Link to="/signup">
          <p>Don't have an account?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
