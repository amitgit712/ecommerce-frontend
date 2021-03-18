import React, {useState, useEffect} from 'react';
import {cartEmpty} from "./helper/CartHelper";
import {Redirect} from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import {getmeToken, processPayment} from "./helper/PaymentHelper";
import {creatOrder} from "./helper/OrderHelper";
import {isAuthenticated, signout} from "../auth/helper/index";


const PaymentB = ({
	products,
	reload = undefined,
	setReload = (f) => f,
	}) => {

	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {}
	});

	const userId = isAuthenticated && isAuthenticated().user.id;
	const token = isAuthenticated && isAuthenticated().token;

	const getToken = (userId, token) => {
		getmeToken(userId, token)
		.then(info =>{
			if (info.error) {
				setInfo({
					...info,
					error: info.error

				})
				signout(() => {
					return <Redirect to="/signin/"/>
				});
			}else{
				const clientToken = info.clientToken
				setInfo({clientToken})
			}
		})
	}

	useEffect(() => {
		getToken(userId, token)
	},[]);

	const getAmount = () => {
		let amount = 0;
		products.map(p =>{
			amount = amount + parseInt(p.price)
		});
		return amount;
	};

	const onParchase = () => {
		setInfo({loading: true})
		let nonce;
		let getNonce = info.instance.requestPaymentMethod()
		.then(data => {
			nonce = data.nonce
			const paymentData = {
				paymentMethodNonce: nonce,
				amount: getAmount()
			};
			processPayment(userId, token, paymentData)
			.then(response => {
				if (response.error) {
					if (response.code == "1") {
						console.log("PAYMENT FAILED ")
						signout(()=>{
							return <Redirect to="/"/>
						})
					}
				}else{
					setInfo({...info,
						success: response.success, loading:false
					})
					console.log("PAYMENT SUCCESS")
					let product_names = ""
					products.forEach(function(item){
						product_names += item.name + ", " 
					});

					const orderData = {
						products:product_names,
						transaction_id:response.transaction.id,
						amount:response.transaction.amount
					}

					creatOrder(userId, token, orderData)
					.then(response =>{
						if (response.error) {
							if (response.code == "1") {
								console.log("ORDER FAILED")
							}
							signout(() =>{
								return <Redirect to="/" />
							})
						}else{
							if (response.success ==  true) {
								console.log("ORDER PLACED SUCCESSFULLY !")
							}
						}
					})
					.catch(error =>{
						setInfo({loading:false, success:false})
						console.log("ORDER FAILED",error)
					})
					cartEmpty(()=>{
						console.log("CART IS EMPYED OUT")
					})

					setReload(!reload)

				}
			})
			.catch(e=> console.log(e))
		})
		.catch(e => console.log("NONCE".e))	
	}
	const showDropin = () => {
		return(
			<div>
				{info.clientToken !== null && products.length > 0 ? 
					(
						<div>  
						<DropIn
						options={{authorization: info.clientToken}}
						onInstance={(instance) => (info.instance = instance)}
						/>
						<button 
						onClick={onParchase}
						className="btn btn-dark">
						CheckOut
						</button>
						
						</div>
					) 
					: (<h3>Pleas add somthing in cart</h3>
				)}
			</div>
			)
	}

    return (

        <div>
        <h1>Payment {getAmount()}</h1>
        	{showDropin()}
        </div>
    );
};


export default PaymentB;
