import React, {useState, useEffect} from 'react';
import Navbar from "../core/Navbar";
import Footer from "../core/Footer";
import {loadCart} from "./helper/CartHelper";
import Card from "./Card";
import PaymentB from "./Payment";

const Cart = () => {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false);
    
    useEffect(() => {
    		setProducts(loadCart());
    }, [reload]);
    
    const  loadCartProducts  = (products) => {
    	return (
    		<>
    		{products.map((product, index) => (
	        	<div className="col-md-3">
    			<Card
    			key={index}
    			product={product}
    			removeFromcart={true}
    			addtoCart={false}
    			BuyNow={true}
    			reload={reload}
    			setReload={setReload}
    			 />
    		</div>
    		))}
    		</>
    		);
    };

    return (
      <>
        <Navbar />
        <div className="container">
        	<div className="row text-center">
	        	
                {products.length > 0 ? 
                    (loadCartProducts(products))
                    :
                    (
                       <h3>no products</h3>
                    )}
                <hr></hr> 
                {products.length > 0 ? 
                    (
                     <PaymentB products={products} 
                     setReload={setReload}/>
                     )
                    :
                    (
                        <h3>Cart is empty</h3>
                    )}
	       </div>
        </div>

        <Footer />
      </>  
    );
};

export default Cart;
