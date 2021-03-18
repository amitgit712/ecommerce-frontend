import React, {useState} from 'react';
import Navbar from "../core/Navbar";
import Footer from "../core/Footer"; 
import {Link} from "react-router-dom";
import {signup} from "../auth/helper/index";
const Signup = () => {
    const [values, setValues] = useState({
    	name: "",
    	email: "",
    	password: "",
    	error: "",
        loading: false,
    	success: false,

    });

    // for directly use
    const {name,email,password,error,success, emailError,loading, nameError, passwordError} = values;
    // comun method for transfering values ex name = "joe"
    const handleChange = name => event => {
    	setValues({...values, error: false, [name]: event.target.value})
    };

    const onSubmit = (event) => {
    	event.preventDefault();
    	setValues({...values, error:false, loading: true});
    	signup({name, email, password})
    	.then(data => {
    		console.log("SIGNUP DATA", data);
    		if (data.email === email) {
				setValues({
					...values,
					name: "",
					emai: "",
					password: "",
					error: "",
                    nameError: "",
                    emailError: "",
                    passwordError: "",
					success: true,
				});    			
    		}else{
    			setValues({
    				...values,
    				error: true,
    				success: false,
    				nameError: data.name,
                    loading: false,
    				emailError:data.email,
    				passwordError: data.password,

    			});
    		}
    	})
    	.catch(e => console.log(e));
    };

    const successMassage = () => {
    	return(
    		<div id="emailHelp" style={{ display: success ? "" : "none" }} className="form-text text-success mb-2 text-center">
				<strong>Account created successfully.</strong>
				<br></br>
				Please cheack your inbox to activate account
			</div>
    		);
    };
        const loadingMessage = () => {
        if (loading) {
            return(
            loading && (
         <button type="submit"  className="mt-4 btn btn-outline-primary btn-primary-shadow col-sm-6"
             style={{ borderRadius:"0px" }} type="button" disabled>
         <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  Loading...
        </button>


                )
            );           
        }else{
            return(
        <button type="submit" className="mt-4 btn btn-outline-primary btn-primary-shadow col-sm-6 "
        onClick={onSubmit}
         style={{ borderRadius:"0px" }}>SIGNUP</button>
           );
        };
    };
    const signUpForm = () => {
    	return(
    		<div className="row mt-4">
    			<form className="col-md-6 offset-sm-3 text-start">
    				{successMassage()}
						
				<div className="mb-3 form-floating">
				<input type="text" value={name}
                className={"form-control " + (nameError ? 'is-invalid' : '')}
				
                 onChange={handleChange("name")}
				 id="name" placeholder="Full Name" aria-describedby="textlHelp" />
				 <label htmlFor="name" className="form-label">
				Full Name</label>
			    <small  style={{ display: nameError ? "" : "none" }} className="text-danger text-center">
                {nameError}
            </small>
            	</div>
			
				<div className="mb-3 form-floating">
				<input type="email" value={email}
                className={"form-control " + (emailError ? 'is-invalid' : '')}
				
                 onChange={handleChange("email")}
				 id="email" placeholder="Email address" aria-describedby="emailHelp" />
				 <label htmlFor="email" className="form-label">
				Email address</label>
				<small  style={{ display: emailError ? "" : "none" }} className="text-danger text-center">
                {emailError}
                </small>
                </div>

				<div className="mb-3 form-floating">
				<input type="password" value={password}
				onChange={handleChange("password")}
				placeholder="Password"

                className={"form-control " + (passwordError ? 'is-invalid' : '')}
                id="password" />
				
                <label htmlFor="password" className="form-label">Password</label>
                <small  style={{ display: passwordError ? "" : "none" }} className="text-danger text-center ">
                {passwordError}
                </small>
				</div>

				<div className="text-center">
				{loadingMessage()}
				
				
				</div>
				<p className="mt-3 text-center">
				<strong>OR</strong></p>
                <p className="text-center">
                    Have an account&nbsp;
                    <strong  className="text-primary">
                    <Link to="/signin/">
                    Signin
                    </Link>
                    </strong>
                </p>
			</form>

    		</div>
    		)
    };
    return (
    	<>
        <Navbar />
    	<div className="container text-center">
        	<h1 className="txt-shadow"><strong>SIGNUP</strong></h1>
    		{signUpForm()}
        </div>
        <Footer />
        </>
    );
};

export default Signup;
