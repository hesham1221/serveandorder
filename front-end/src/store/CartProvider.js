import { useReducer,useState } from "react";
import AuthContext from './cart-contex';

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItmesIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const exsitingCartItem = state.items[existingCartItmesIndex];
    let updatedItems;
    if (exsitingCartItem) {
      const updatedItem = {
        ...exsitingCartItem,
        amount: exsitingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItmesIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      ...state,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItmesIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItmesIndex];
    const updatedTotalAmount=state.totalAmount - existingItem.price;
    let updatedItems ;
    if(existingItem.amount === 1){
        updatedItems=state.items.filter(item => item.id !== action.id);
    }else {
        const updatedItem = {...existingItem,amount : existingItem.amount - 1};
        updatedItems = [...state.items];
        updatedItems[existingCartItmesIndex]= updatedItem;
    }
    return {
      ...state,
        items : updatedItems,
        totalAmount : updatedTotalAmount
    }
}
if (action.type === 'ADD_MEALS'){
  const oldMeals = state.meals
  console.log(oldMeals)
  console.log(state)
  console.log(action.meal)
  const newMeals = Array.isArray(action.meal) ? [...action.meal] : [...oldMeals,action.meal]
  return {
    ...state,
    meals : newMeals
  }
}
  return defaultReducer;
};
const defaultReducer = {
  items: [],
  totalAmount: 0,
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultReducer
  );
  const addItemHandler = (item) => {
    dispatchCartState({
      type: "ADD_ITEM",
      item: item,
    });
  };
  const removeItemHandler = (id) => {
    dispatchCartState({
      type: "REMOVE_ITEM",
      id: id,
    });
  };
  const addAMeal = (meal) =>{
    dispatchCartState({
      type:'ADD_MEALS',
      meal : meal
    })
  }
  const [token, setToken] = useState(null);
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');

  const userIsLoggedIn = !!token;


  const nameHandler = (name) =>{
    setName(name)
  }
  const emailHandler = (email) =>{
    setEmail(email)
  }
  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };


  const authContex = {
    items: cartState.items,
    meals: cartState.meals,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    addAMeal,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    name:name,
    email:email,
    getName:nameHandler,
    getEmail:emailHandler
  };

  return (
      <AuthContext.Provider value={authContex} >
        {props.children}
        
      </AuthContext.Provider>
    );
};
export default CartProvider;
