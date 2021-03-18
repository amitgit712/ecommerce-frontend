import React, {useState} from 'react';
import Navbar from "../core/Navbar";
import Footer from "../core/Footer"; 
import {Link, Redirect} from "react-router-dom";
import {signin, authenticate, isAuthenticated} from "../auth/helper/index";


const Signin = () => {

	const [values, setValues] = useState({
		name:"",
		email:"amit@gmail.com",
		password:"asdf1234",
		error: "",
		success: false,
		loading: false,
		didRedirect: false,
	});
	// for directly use
    const {name, email,password,error,success, loading, didRedirect, emailError, passwordError} = values;
    // comun method for transfering values ex name = "joe"
    const handleChange = name => event => {
    	setValues({...values, error: false, [name]: event.target.value})
    };

    const onSubmit = (event) => {
    	event.preventDefault();
    	setValues({
    		...values,
    		error: false,
    		loading: true,
    	});
    	signin({email, password})
    	.then(data=>{
    		console.log("DATA",data);
            if (data.token) {
                // let sessionToken = data.token;

                authenticate(data,()=> {
                    console.log("TOKEN ADDED");
                    setValues({
                        ...values,
                        didRedirect: true,

                    });

                });
            }else{
                setValues({
                    ...values,
                    loading: false,
                    error: true,
                });
            }
    	})
    	.catch(e => console.log(e));
    };

    const performRedirect = () => {
        if (isAuthenticated()) {
            return <Redirect to="/user/dashboard/" />;
        }
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
                 style={{ borderRadius:"0px" }}>SIGNIN

              </button>

            );
        }
    } 
    const eroorMassage = () => {
    	return(
    		<div id="emailHelp" style={{ display: error ? "" : "none" }} className="form-text text-danger mb-2 text-center">
				<strong>Invalid credential</strong>
				<br></br>
			</div>
    		);
    };

    const signInForm = () => {
    	return(
    		<div className="row mt-4">
    			<form className="col-md-6 offset-sm-3 text-start">
    				{eroorMassage()}
			
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
                    Don`t have account&nbsp;
                    <strong  className="text-primary">
                    <Link to="/signup/">
                    Signup
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
        	<h1 className="txt-shadow"><strong>SIGNIN</strong></h1>
            {signInForm()}
            {performRedirect()}
        </div>
        <Footer />
        </>
    );
};



export default Signin;
