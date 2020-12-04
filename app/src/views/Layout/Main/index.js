import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../../Home";
import Map from "../../Map";
import "./style.scss";

const Main = () => {
	return (
		<div id='main'>
			<Switch>
				<Route component={Home} path='/home' />
				<Route component={Map} path='/map' />
				<Redirect to='/home' />
			</Switch>
		</div>
	);
};

export default Main;
