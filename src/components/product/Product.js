import React, { useContext, useRef } from 'react';
import {CartContext} from '../../context/CartContext';
import Input from './Input';
import { Button } from 'react-bootstrap';

const Product = (props) => {
    const price = `$${props.price.toFixed(2)}`;
  
    return (
      <li className={'list-unstyled'}>
        <div>
          <h3>{props.name}</h3>
          <div className={''}>{props.description}</div>
          <div className={''}>{price}</div>
        </div>
        <div>
        <QuantityManager id={props.id} name={props.name} description={props.description} price={props.price}/>
      </div>
      </li>
    );
}

export default Product;

const QuantityManager = (props) => {
    const quantityRef = useRef();
 
  const {addItem} = useContext(CartContext); 
  
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredQuantity = quantityRef.current.value;
    const enteredQuantityNumber = +enteredQuantity;

    if (
      enteredQuantity.trim().length === 0 ||
      enteredQuantityNumber < 1 ||
      enteredQuantityNumber > 10
    ) {
      alert("Please enter valid quantity (1-10)")
      return;
    }

    let item = {
      id: props.id,
      name: props.name,
      quantity:parseFloat(enteredQuantityNumber),
      price: parseFloat(props.price),
      description: props.description
    }

    addItem(item);

  }
  
    return (
        <form className={"d-flex flex-column gap-2"} onSubmit={submitHandler} style={{width:"100px"}}>
            <Input
            type="number"
            label="Quantity"
            id="quantity"
            defaultValue={1}
            step={1}
            min={1}
            max={10}
            ref={quantityRef}
            />
            <Button type="submit" variant="primary">+ Add</Button>
        </form>
      )
}





