import React, {useContext, useReducer, useEffect, useCallback} from "react";
import { AuthContext } from "./AuthContext";
import  {toast} from "react-toastify";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    removeEntireItem: (id) => {},
    removeAllItems: () => {},
    quantityChangeHandler: () => {},
    setCart: () => {}
});


const defaultState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    switch(action.type){
        case "ADD": {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
            );
            

            const existingCartItem = state.items[existingCartItemIndex];

           
            let updatedItems;
        
            if (existingCartItem) {
                const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + action.item.quantity,
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }
            
            
            const updatedTotalAmount = state.totalAmount + action.item.price*action.item.quantity
            
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }

        case "QUANTITY_CHANGE":{
            const updatedItems = state.items.map((el)=> {
                if(el.id===action.payload.id){
                    return { ...el, quantity:action.payload.quantity } 
                }
                return el;
            })

            const updatedTotalAmount = updatedItems.reduce((acc,el)=>acc+(el.price*el.quantity),0);

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }
        

        case "REMOVE": {
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );

            const existingCartItem = state.items[existingCartItemIndex];
            
            const updatedTotalAmount = state.totalAmount - existingCartItem.price;
            
            let updatedItems;
            
            if(existingCartItem.quantity===1){
                updatedItems = state.items.filter(item => item.id !== action.id);
            }else{
                const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }

        case "REMOVE_ENTIRE_ITEM": {
            const cartItemIndex = state.items.findIndex((item) => item.id === action.id);
            const cartItem = state.items[cartItemIndex];
            const updatedTotalAmount = state.totalAmount - cartItem.price*cartItem.quantity;

            const updatedItems = state.items.filter((item) => item.id !== action.id);
            
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }

        case "REMOVE_ALL": {
            return defaultState;
        }

        case "SET_CART": {
            if (!action.payload || !action.payload.items || !action.payload.totalAmount) {
                // If payload or its properties are null, return the default state
                return defaultState;
            }
            const {items,totalAmount} = action.payload;
           
            return  {
                items,
                totalAmount
            }
        }

        default: 
            return defaultState;
    }
}

const CartContextProvider = (props) => {
    const [cartState,dispatch] = useReducer(cartReducer,defaultState);
    const {isAuthenticated} = useContext(AuthContext);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!isAuthenticated) {
            const storedCart = JSON.parse(localStorage.getItem("cart"));
            dispatch({ type: "SET_CART", payload: storedCart });
        }
    }, [isAuthenticated]);


    const updateCartOnLogin = useCallback(async (cartItems,amount) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_ENDPOINT}/api/cart/update-cart`, {
                method: "POST",
                body: JSON.stringify({ cartItems, amount }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (res.ok) {
                const dbCart = await res.json();
                dispatch({ type: "SET_CART", payload: dbCart });
                localStorage.removeItem('cart'); // Clear local storage after updating server cart
            } else {
                const errorData = await res.json();
                toast.error(errorData.error || 'Failed to update cart on login');
            }
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    },[token]);

    useEffect(() => {
        const synchronizeCart = async () => {
            if (isAuthenticated) {
                const storedCart = JSON.parse(localStorage.getItem("cart"));
                if (storedCart?.items?.length > 0) {
                    console.log("update cart called")
                    await updateCartOnLogin(storedCart.items,storedCart.totalAmount);
                }
            }
        };
        synchronizeCart();
    }, [isAuthenticated,updateCartOnLogin]);
    



    //DB OPERATIONS

    const addToDB = async (item) => {
        const productId = item.id;
       
        const quantity = item.quantity;

        const price = item.price;
       
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_ENDPOINT}/api/cart`, {
                method: "POST",
                body: JSON.stringify({productId,quantity,price}),
                headers:{
                    "Content-Type":"application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

          //  console.log(res);
            if (res.ok) {

                const dbCart = await res.json();
           //     console.log(dbCart);
                dispatch({type:"ADD", item});
                toast.success("Selected item has been added to cart successfully!");
            }

        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    }


    
    


    const removeEntireItemFromDB = async (id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_ENDPOINT}/api/cart/${id}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });

          //  console.log(res);
            if (res.ok) {

                const dbCart = await res.json();
       //         console.log(dbCart);
                dispatch({type:"REMOVE_ENTIRE_ITEM",id})
                toast.success("Selected item has been deleted successfully!");
            }

        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    }

    const placeOrder = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_ENDPOINT}/api/cart/place-order`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            console.log(res);
            if (res.ok) {
                const dbCart = await res.json();
                console.log(dbCart);
                dispatch({ type: "REMOVE_ALL" });
                toast.success("Your order has been placed successfully!");
            } else {
                const errorData = await res.json();
                toast.error(errorData.error || 'Failed to place order');
            }
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };


    const changeQunatityFromDB = async(item,quantity)=> {
       const {id,quantity:prevQuantity,price} = item;
      
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_ENDPOINT}/api/cart/${id}`, {
                method: "PATCH",
                body: JSON.stringify({quantity,prevQuantity,price}),
                headers:{
                    "Content-Type":"application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

       //     console.log(res);
            if (res.ok) {

                const dbCart = await res.json();
       //         console.log(dbCart);
                const payload = {id,quantity}
                dispatch({type:"QUANTITY_CHANGE",payload});
                toast.success("Selected item's quantity has been changed in the cart successfully!");
            }

        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    }


// Context functions
    
    const addItemToCartHandler = (item) => {
        if(isAuthenticated){
            addToDB(item);
           
        }else{
            dispatch({type:"ADD", item});
            toast.success("Selected item has been added to cart successfully!");

            const currentCart = {
                items: [...cartState.items, item],
                totalAmount: cartState.totalAmount + item.price * item.quantity
            };
            localStorage.setItem("cart",JSON.stringify(currentCart))
        } 
        
    }

    const removeItemFromCartHandler = (id) => {
        if(isAuthenticated){
            
        }
        dispatch({type:"REMOVE",id})
    }

    const removeEntireItemFromCartHandler = (id) => {
        if(isAuthenticated){
            removeEntireItemFromDB(id);
        }else{
            dispatch({type:"REMOVE_ENTIRE_ITEM",id});
            toast.success("Selected item has been deleted successfully!");

            const updatedItems = cartState.items.filter(item => item.id !== id);
            const updatedTotalAmount = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const cart = { items: updatedItems, totalAmount: updatedTotalAmount }
            localStorage.setItem("cart",JSON.stringify(cart));
        }
       
    }

    const removeAllItemsFromCartHandler = () => {
        if(isAuthenticated){
            placeOrder();
        }else{
            dispatch({type:"REMOVE_ALL"});
            toast.success("Your order placed successfully!");
            
            const cart = { items: [], totalAmount: 0 }
            localStorage.setItem("cart",JSON.stringify(cart));
        }
       
    }

    const setCart = (payload) => {
        
        dispatch({type:"SET_CART",payload});
    }

    const quantityChangeHandler = (el,quantity) => {
        const id = {el};
        const payload = {id,quantity}
        if(isAuthenticated){
            //quantity = curr
            changeQunatityFromDB(el,quantity);
        }else{
            
            dispatch({type:"QUANTITY_CHANGE",payload});
            const updatedItems = cartState.items.map(item =>
                item.id === id ? { ...item, quantity: quantity } : item
            );
            const updatedTotalAmount = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const cart = { items: updatedItems, totalAmount: updatedTotalAmount }
            localStorage.setItem("cart",JSON.stringify(cart));
        }
       
    }
    
  

    

    let cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        removeEntireItem: removeEntireItemFromCartHandler,
        removeAllItems : removeAllItemsFromCartHandler ,
        setCart,
        quantityChangeHandler
    }

return(
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
)
}

export{
    CartContext,
    CartContextProvider
}
