import React, { useState } from "react";
import logo from "../assets/logo.png";

export default function Sign({ handleSignUp, handleLogIn, islogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isexpand, setExpand] = useState(false);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    handleSignUp(username, email, password);
  };

  const handleLogInSubmit = (e) => {
    e.preventDefault();
    handleLogIn(email, password);
  };

  const handleExpand = () => {
    setExpand(!isexpand);
  };

  return (
    <div
      className={`${
        islogin ? "hidden" : "flex"
      } justify-center h-screen items-center`}
    >
      <div className="container w-full p-8 flex flex-col justify-evenly items-center gap-6">
        <h1 className="text-5xl text-purple-600 font-semibold text-center">
          Welcome
        </h1>
        <img src={logo} alt="Sign" className="w-96" />
        <p
          onClick={handleExpand}
          className="text-purple-600 cursor-pointer font-semibold"
        >
          {isexpand ? "New? Create an account!" : "Have an account? Log in!"}
        </p>
        <form
          onSubmit={isexpand ? handleLogInSubmit : handleSignUpSubmit}
          className="text-white flex flex-col gap-3 w-full md:w-96"
        >
          {!isexpand && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 border border-purple-600 bg-purple-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black text-lg"
            />
          )}
          <input
            type="text"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-purple-600 rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black text-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-purple-600 rounded-lg bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black text-lg"
          />
          <button
            type="submit"
            className={`p-3 rounded-lg text-white text-lg bg-purple-600 hover:bg-purple-800 transition duration-300 font-semibold`}
          >
            {isexpand ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
