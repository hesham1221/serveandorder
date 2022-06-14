import { useState, useRef, useContext } from "react";
import authContext from "../../store/cart-contex";

import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();
  const enterednameRef = useRef();
  const [success, setSuccess] = useState({
    email: "",
    password: "",
    name: "",
  });

  const authCtx = useContext(authContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isloading, setIsloading] = useState(false);

  function makeToken(id,password){
    const token = `${id}-hT-${password}`
    localStorage.setItem('order-serveT' , token)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setIsloading(true);
    let enteredname;
    !isLogin && (enteredname = enterednameRef.current.value);
    const enteredEmail = enteredEmailRef.current.value;
    const enteredPassword = enteredPasswordRef.current.value;
    let url;
    let bodyf;
    if (isLogin) {
      url = `${process.env.react_app_FOOD_API}/login`;
      bodyf = {
        email: enteredEmail,
        password: enteredPassword,
      };
    } else {
      url = `${process.env.react_app_FOOD_API}/create-user`;
      bodyf = {
        username: enteredname,
        email: enteredEmail,
        password: enteredPassword,
      };
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyf),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsloading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Auth Faild";
            //    if (data && data.error && data.error.message){
            //        errorMsg = data.error.message;
            // }
            throw new Error(errorMsg);
          });
        }
      })
      .then((res) => {
        console.log(res);
        authCtx.login(res._id);
        authCtx.getName(res.username);
        authCtx.getEmail(res.email);
        let status = res.status;
        if (status === "success") {
          setSuccess(
            (value) => (value = { email: "", password: "", name: "" })
          );
          props.onDeactivate();
        }
        makeToken(res._id,res.password)
      })
      .catch((err) => {
        alert(err.message);
      });

      props.onDeactivate()
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onChangeHandler = (e) => {
    const successValue = {
      email: enteredEmailRef.current.value,
      password: enteredPasswordRef.current.value,
    };
    !isLogin && (successValue.name = enterednameRef.current.value);
    setSuccess(successValue);
  };
  return (
    <section className={classes.auth}>
      <button className={classes.close} onClick={props.onDeactivate}>
        X
      </button>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          {!isLogin && (
            <div>
              {" "}
              <label htmlFor="name">your Name</label>
              <input
                type="text"
                id="name"
                required
                ref={enterednameRef}
                onChange={onChangeHandler}
                value={success.name}
              />
            </div>
          )}
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            ref={enteredEmailRef}
            onChange={onChangeHandler}
            value={success.email}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={enteredPasswordRef}
            onChange={onChangeHandler}
            value={success.password}
          />
        </div>
        <div className={classes.actions}>
          {!isloading ? (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          ) : (
            <p>Sending Request..........</p>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
