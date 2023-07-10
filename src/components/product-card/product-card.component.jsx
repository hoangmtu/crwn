import { useContext } from 'react';

import './product-card.styles.scss';
import Button from '../button/button.component';
import { CartContext } from '../../contexts/cart-context';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
    const {name, price, imageUrl} = product;
    const { addItemToCart } = useContext(CartContext);

    const addProducttoCart = () => addItemToCart(product);

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
                <Button  buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProducttoCart}>Add to Card</Button>
            </div>
        </div>
    )
}

export default ProductCard;