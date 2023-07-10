import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart-context';

import './cart-dropdown.styles.jsx';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';
import CartItem from '../cart-item/cart-item.component';

import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length? (
                        cartItems.map((item) => (<CartItem key={item.id} CartItem={item}/>))
                    ): (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                } 
            </CartItems>
            <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}   

export default CartDropdown;