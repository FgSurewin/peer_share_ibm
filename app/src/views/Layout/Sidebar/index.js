import React from "react";
import { NavLink as Link } from "react-router-dom";
import "./style.scss";

const Sidebar = () => {
	return (
		<div
			id='sidebar'
			style={{
				position: "fixed",
				left: "0",
				top: "0",
			}}
		>
			<div className='title'>
				<span className='title-left'>Peer</span>
				<span className='title-right'>Share</span>
			</div>
			<nav className='navbar'>
				<Link to='/home' activeClassName='selected'>
					Home
				</Link>
				<Link to='/map' activeClassName='selected'>
					Map
				</Link>
			</nav>
		</div>
	);
};

export default Sidebar;
