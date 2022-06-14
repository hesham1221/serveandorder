import React, { useContext, useState, useRef } from "react";
import authContex from "../../store/cart-contex";
import ProfileIcon from "../Layout/ProfileIcon";
import classes from "./Profile.module.css";
const Profile = (props) => {
  const [dish, setDish] = useState({
    mealName: "",
    mealPrice: "",
    mealdescrip: "",
  });
  const mealNameRef = useRef();
  const mealPriceRef = useRef();
  const mealDescripRef = useRef();
  const onChangeHandler = () => {
    setDish({
      mealName: mealNameRef.current.value,
      mealPrice: mealPriceRef.current.value,
      mealdescrip: mealDescripRef.current.value,
    });
  };
  const authCtx = useContext(authContex);
  const creatNewDish = () => {
    fetch(`${process.env.react_app_FOOD_API}/add-food`, {
      method: "POST",
      body: JSON.stringify({
        title: dish.mealName,
        description: dish.mealdescrip,
        price: dish.mealPrice,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        authCtx.addAMeal(data.data);
        props.onDeactivate();
      });
  };
  const [create, setCreate] = useState(false);
  const creatHandler = () => {
    setCreate((create) => !create);
  };
  const logoutHandler = () =>{
    authCtx.logout()
    localStorage.removeItem('order-serveT')
    props.onDeactivate()
  }
  return (
    <React.Fragment>
      <div className={classes.auth}>
        <button className={classes.close} onClick={props.onDeactivate}>
          X
        </button>
        {!create && (
          <React.Fragment>
            <ProfileIcon fill="#5c1e01" className={classes.icon} />
            <h1>Name : <span>{authCtx.name}</span></h1>
            <h1>E-mail : <span>{authCtx.email}</span></h1>
            <div className={classes.actions}>
              <button onClick={logoutHandler}>Logout</button>
              <button onClick={creatHandler} className={classes.toggle}>
                Create new meal
              </button>
            </div>
          </React.Fragment>
        )}
        {create && (
          <React.Fragment>
            <div className={classes.control}>
              <label htmlFor="mealname">Meal Name :</label>
              <input
                id="mealname"
                ref={mealNameRef}
                onChange={onChangeHandler}
                value={dish.mealName}
              />
              <label htmlFor="description">Description :</label>
              <input
                id="description"
                ref={mealDescripRef}
                onChange={onChangeHandler}
                value={dish.mealdescrip}
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                ref={mealPriceRef}
                onChange={onChangeHandler}
                value={dish.mealPrice}
              />
            </div>
            <div className={classes.actions}>
              <button onClick={creatNewDish}>Create Meal</button>
              <button onClick={creatHandler} className={classes.toggle}>
                My Profile
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Profile;
