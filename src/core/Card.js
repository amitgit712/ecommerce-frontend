import React, {useState} from 'react';
import ImageHelper from './helper/ImageHelper';
import {Redirect} from 'react-router-dom';
import {addItemToCart , removeItemFromCart} from "./helper/CartHelper";
import {isAuthenticated} from "../auth/helper/index";


const Card = ({
	product,
	addtoCart = true,
	removeFromcart = false,
	BuyNow = false,
	reload = undefined,
	setReload = f => f,
	//function(f){return f} 
}) => {
	const [redirect, setRedirect] = useState(false);
	const cardDescriptin = product ? product.description : "Photo from pixel.com"
	const cardPrice = product ? product.price : "00"
	
	const addToCart = () => {
		if (isAuthenticated()) {
			addItemToCart(product, ()=> setRedirect(true));
			console.log("Added to cart")

		}else{
			console.log("Login First")
		};
	};

	const buyNow = () => {
		if (isAuthenticated()) {
			console.log("Buy Now")

		}else{
			console.log("Login First")
		};
	};

	const getRedirect = redirect => {
		if (redirect) {
			return <Redirect to="/cart/" />
		};
	};

	const showAddToCart = addTocart => {
		return(
			addtoCart && (
				<button onClick={addToCart}
		      	className="btn btn-outline-dark p-1 mb-2"  style={{ borderRadius:"0px" }}>ADD TO CART</button>
				)
			);
	};

	const showBuyNow = buyNow => {
		return(
			BuyNow && (
			<button 
		      	className="btn btn-outline-success p-1 mb-2"  style={{ borderRadius:"0px" }}>BUY NOW</button>
				)
			);
	}

	const showRemoveCart = removeFromcart => {
		return(
			removeFromcart && (
				<button onClick={() => {
					removeItemFromCart(product.id)
					setReload(!reload)
				}}
		      	className="btn btn-outline-danger p-1 mb-2" style={{ borderRadius:"0px" }}>REMOVE</button>
			)
		);
	};

    return (
		    <div className="card shadow-lg">
		      <ImageHelper product={product} />
		      <div className="card-body">
		        <p className="card-text">{cardDescriptin}</p>
		        <p className="card-text display-6"><strong>$</strong>{cardPrice}</p>

		      	<div className="d-grid gap-2">
		      	{getRedirect(redirect)}
		      	{showAddToCart(addToCart)}
		      	{showBuyNow(buyNow)}
		      	{showRemoveCart(removeFromcart)}
		      	
		      	</div>
		      </div>
		    </div>
    );
};


export default Card;
