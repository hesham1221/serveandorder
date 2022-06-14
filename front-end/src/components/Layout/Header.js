import React from "react";
import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";
import ProfileButton from "./ProfileButton";
const Header = props =>{
    return <React.Fragment>
        <header className={classes.header}>
            <h1>Order or Serve</h1>
            <HeaderCartButton onClick={props.onClick} />
            <ProfileButton onClick={props.onActive}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="meals" />
        </div>
    </React.Fragment>
};
export default Header ;