import React, {useState, useEffect} from 'react';
import { getProducts } from "./helper/CoreApicalls.js";
import '../styles.css';
import Card from "./Card";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function Home(){
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);

	const loadAllProducts = ()=> {
		getProducts()
		.then(data => {
			if (data.error) {
				setError(data.error);
				console.log(error);
			}else{
				setProducts(data);
			}
		});
	};

	useEffect(()=> {
		loadAllProducts();
	},[]);

	return (
		<div>
        <Navbar />
        <div className="container-fluid">
		<div className="row">
		<h1 className="text-center"></h1>
			{products.map( (product, index)=> {
				return(
					<div key={index}  className="col-md-3 mb-3 ">
					<Card product={product}/>
					</div>
				);
			})}
		</div>
		</div>
         <Footer />

		</div>
		);
};
 