import React, { useEffect, useState } from "react";
import { useLoginUserMutation } from "../../context/api/userApi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../context/slices/authSlice";
import "./login.scss";

const Login = () => {
  let [username, setUsername] = useState("iskandar");
  let [password, setPassword] = useState("iskandar");
  let [userLogin, { data, isLoading, isSuccess }] = useLoginUserMutation();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  console.log(data?.payload?.user);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data?.payload?.token));
      dispatch(setUser(data?.payload?.user));
      navigate("/");
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin({ username, password });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} action="">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>login</button>
        <NavLink className={"active"} to={"/register"}>
          {" "}
          Don't have an account?{" "}
          <span style={{ cursor: "pointer", color: "#007bff" }}>Register</span>
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
