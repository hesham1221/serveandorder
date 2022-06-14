import { useContext, useEffect, useState } from "react";
import authContex from "../../store/cart-contex";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItems/MealItems";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];
const AvailableMeals = () => {
  const authCtx = useContext(authContex);
  const [noFood,setNoFood] = useState(false)
  const [loading , setloading] = useState(true)
  useEffect(() =>{
    const fecthMeals = async ()=>{
      try{
        const data = await fetch(`${process.env.react_app_FOOD_API}/food`)
        const food = await data.json()
        if(food === 'no food to show') {
          setNoFood(true)
          setloading(false)
        }
        else{
          authCtx.addAMeal(food)
          setloading(false)
        }
      }catch(e){
        console.log(e)
        setNoFood(true)
      }
    }
    fecthMeals()
  },[])
  const meals = authCtx.meals || []
  console.log(meals)
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {(noFood&&!loading)&& <h2>No food to display</h2>}
          {loading && <h2>Loading..</h2>}
          {(!noFood&&!loading) && meals.map((dum) => (
            <MealItem
              id={dum._id}
              key={dum.id}
              name={dum.title}
              description={dum.description}
              price={dum.price}
            >
              {dum.name}
            </MealItem>
          ))}
        </ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
