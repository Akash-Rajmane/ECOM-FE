import React, {useContext,useEffect} from 'react';
import {CartContext} from '../context/CartContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';


const Cart = () => {
const {items, setCart, totalAmount, removeEntireItem, removeAllItems, quantityChangeHandler} = useContext(CartContext);
const {isAuthenticated} = useContext(AuthContext);
const navigate = useNavigate();
const token = localStorage.getItem('token');

useEffect(() => {
    const fetchCart = async () => {
        try {
           
            const res = await fetch(`${process.env.REACT_APP_BE_ENDPOINT}/api/cart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
          // console.log(res);
    
            if (res.ok) {
                const payload = await res.json();
          //      console.log(payload, "fecth cart");
                setCart(payload);
            } else {
             
                console.error('Failed to fetch products:', res.statusText);
                toast.error(res.statusText);
            }
        } catch (error) {
            toast.error(error);
            console.error('Error fetching products:', error.message);
        }
    
    };
    if(isAuthenticated){
        fetchCart();
    }
   
}, []);


const deleteItem = (id) => {
    removeEntireItem(id);
}

const checkoutHandler = () => {
    if(!isAuthenticated){
        toast.error("Please login to proceed to checkout!");
        navigate("/auth");
    }else{
        if(items.length===0){
            toast.warning("Cart is empty. Please add items in the cart first.")
            return;
        }
        removeAllItems();
    }
};



  return (
    <div className='p-2' style={{minHeight:"90vh"}}>
        <ul className='list-unstyled px-4'>
            {
                items.map(el=>{
                
                return(
                <li className={"border-bottom border-3 p-2"} key={el.id}>
                    <div className="d-flex flex-column">
                        <h2>{el.name}</h2>
                        <div className='d-flex gap-4 fs-3 fw-semibold'>
                            <div className="text-secondary ">₹ {el.price}</div>
                            <div >
                               x <input 
                               type="number" 
                               step="1" 
                               value={el.quantity} 
                               style={{width:"50px"}}
                               min="1"
                               onChange={(e) =>{ 
                                    const quantity = parseFloat(e.target.value)
                                    return quantityChangeHandler(el, quantity)
                                 }
                                }
                               />
                            </div>
                            <div>
                            = ₹ {el.price*el.quantity}
                            </div>
                        </div>
                    </div>
                    <Button variant='danger' className='my-2' onClick={()=>deleteItem(el.id)}>Delete</Button>
                </li>)
            })
        }
    </ul>
    { items.length===0 ? <div className='m-4 fs-3 fw-bold d-flex justify-content-center align-items-center'>Cart is empty</div> 
    : <div className='p-4'>
        <h2 className={'d-flex justify-content-between align-items-center'}>
            <span>Total Amount</span>
            <span>₹ {Math.abs(totalAmount).toFixed(2)}</span>
        </h2>
        <div className='d-flex justify-content-end gap-4 mt-4'>
            <Button variant='secondary' size="lg" onClick={()=>navigate("/")}>Continue Shopping</Button>
            <Button variant='success' size="lg" onClick={checkoutHandler}>{isAuthenticated?"Place Order":"Checkout"}</Button>
        </div>
    </div>}
</div>
  )
}

export default Cart;
