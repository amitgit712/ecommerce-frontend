import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import About from "./core/About";
import Contact from "./core/Contact";
import Cart from "./core/Cart";


import PrivateRouts from "./auth/helper/PrivateRouts";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import UserDashboard from "./user/UserDashboard";

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
        	<Route path="/" exact component={Home} />
            <Route path="/about/" exact component={About} />
            <Route path="/contact/" exact component={Contact} />
            <Route path="/signup/" exact component={Signup} />
            <Route path="/cart/" exact component={Cart} />
        	<Route path="/signin/" exact component={Signin} />
        	<PrivateRouts path="/user/dashboard/" exact component={UserDashboard}/>
        </Switch>

        </BrowserRouter>
    );
};

export default Routes;

