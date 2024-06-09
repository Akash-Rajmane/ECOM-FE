import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';


function CartButton({cartItems,clickHandler}) {


  return (
    <Button variant="outline-secondary" onClick={clickHandler}>
      <img src="https://img.icons8.com/?size=35&id=8chNl15hy6jY&format=png&color=000000" alt="cart"/>
       {cartItems>0 && <Badge pill bg="success">{cartItems}</Badge>}
      <span className="visually-hidden">cart items</span>
    </Button>
  );
}

export default CartButton;