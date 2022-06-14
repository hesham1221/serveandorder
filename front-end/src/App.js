import React, { useState, useContext, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import LoginForm from "./components/Layout/LoginForm";
import AuthContext from "./store/cart-contex";
function App() {
  console.log(process.env)

  const [cartActivate, setCartActivate] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const activateCart = () => {
    setCartActivate(true);
  };
  const deactivateCart = () => {
    setCartActivate(false);
  };
  const activeProfileHandler = () => {
    setProfileActive(true);
  };
  const deactivateHandler = () => {
    setProfileActive(false);
  };
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.getItem("order-serveT")) {
      const token = localStorage.getItem("order-serveT");

      const id = token.split("-hT-")[0];
      const password = token.split("-hT-")[1];

      console.log("id :", id, "- password :", password);
      const autoLogin = async () => {
        try {
          const res = await fetch(`${process.env.react_app_FOOD_API}/tlogin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              password: password,
            }),
          });
          const data = await res.json();
          console.log(data)
          authCtx.login(data._id);
          authCtx.getName(data.username);
          authCtx.getEmail(data.email);
        } catch (err) {
          console.log(err);
        }
      };
      autoLogin();
    }
  }, [authCtx]);

  const isLoggedIn = authCtx.isLoggedIn;
  console.log(authCtx)


  return (
    <React.Fragment>
      {cartActivate && <Cart onClose={deactivateCart} />}
      {profileActive && <LoginForm onDeactivate={deactivateHandler} />}
      <Header onClick={activateCart} onActive={activeProfileHandler} />
      <main>
        {isLoggedIn ? (
          <Meals />
        ) : (
          <p className="mustlogin">you must Login First</p>
        )}
      </main>
    </React.Fragment>
  );
}

export default App;
