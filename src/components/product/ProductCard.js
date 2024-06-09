import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import { CartContext } from '../../context/CartContext';

const ProductCard = (props) => {
    const {addItem} = useContext(CartContext);

    const addTOCartHandler = () => {
      const newItem = {
        ...props,
        quantity: 1,
        price: parseFloat(props.price)
      }
        addItem(newItem);
    }

  return (
      <div className="card m-4" style={{height:"550px"}}>
        <img src={props.image} className="card-img-top" alt={props.name} height="350px" />
        <div className="card-body">
            <h5 className="card-title fs-3">{props.name}</h5>
            <p className="card-text text-truncate">{props.description}</p>
            <p className="card-text fs-5"><strong>₹ {props.price}</strong></p>
        </div>
        <Button variant="primary" onClick={addTOCartHandler}>Add To Cart</Button>
        
    </div>
  )
}

export default ProductCard;