import { useContext,useState,useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContex from "../../store/cart-contex";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [bumpBtn,setBumpBtn] = useState(false);
  const cartCTX = useContext(CartContex);

  const cartNum = cartCTX.items?.reduce((curNum,item)=>{
    return curNum + item.amount
  } ,0);
  const items = cartCTX.items;
  useEffect(()=>{
    if(items?.amount === 0){
      return
    }
    setBumpBtn(true);
  const timer = setTimeout(() => {
      setBumpBtn(false)
    }, 300);
    return () =>{
      clearTimeout(timer)
    }
  },[items])
  const btnClasses = `${classes.button} ${bumpBtn && classes.bump}`
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartNum}</span>
    </button>
  );
};
export default HeaderCartButton;
