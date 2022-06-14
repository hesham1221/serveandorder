import { useRef,useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
const MealItemForm = (props) => {
    const[validAmount,setValidAmount]=useState(true);
  const mealSubmitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = ref.current.value;
    const enteredNumAmount = +enteredAmount;

    if (
      enteredAmount.trim() === 0 ||
      enteredNumAmount < 1 ||
      enteredNumAmount > 5
    ) {
        setValidAmount(false)
        return;
    }
    props.onAddToCart(enteredNumAmount);
  };
  const ref = useRef();
  return (
    <form className={classes.form} onSubmit={mealSubmitHandler}>
    
      <Input
        ref={ref}
        label="Amount :"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!validAmount && <p>please enter a valid amount</p>}
    </form>
  );
};
export default MealItemForm;
