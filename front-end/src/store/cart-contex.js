import React from 'react';

const authContex =  React.createContext({
    items :[],
    meals:[{}],
    totalAmount :0,
    addItem :(item)=>{},
    addAMeal : (meal)=>{},
    removeItem : () =>{},
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
    name:'',
    email : '',
    getName :(name) =>{},
    getEmail : (email) =>{}
})

export default authContex;