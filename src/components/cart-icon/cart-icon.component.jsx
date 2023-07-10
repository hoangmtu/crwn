import { useContext } from 'react';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

import { CartContext } from '../../contexts/cart-context';

const CartIcon = () => {
    const { isCartOpen ,setIsCartOpen, cartcount } = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount>{cartcount}</ItemCount>
    </CartIconContainer>
  )      
}

export default CartIcon