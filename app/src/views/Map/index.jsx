import React from "react";
import { projectFirestore } from "../../firebase/config";
import { Route, Switch, Redirect } from "react-router-dom";
import Content from "./content";
import Register from "./register";
import smallWave from "../../images/smallWave.svg";
import "./map.scss";

const Map = () => {
	const [info, setInfo] = React.useState([]);
	const currentUser = React.useRef(null);

	React.useEffect(() => {
		const loadData = async () => {
			const collectionRef = projectFirestore.collection("users");
			const querySnapshot = await collectionRef.get();
			querySnapshot.forEach((doc) => setInfo((c) => [...c, doc.data()]));
		};
		if (info.length === 0) {
			loadData();
		}
	}, [info, setInfo]);

	return (
		<div id='Map'>
			<div className='smallWave-container'>
				<img src={smallWave} alt='smallWave' />
			</div>
			<div className='content'>
				<Switch>
					<Route
						path='/map/content'
						render={(props) => (
							<Content
								{...props}
								info={info}
								setInfo={setInfo}
								currentUser={currentUser}
							/>
						)}
					/>
					<Route
						path='/map/add'
						render={(props) => (
							<Register
								{...props}
								setInfo={setInfo}
								info={info}
								currentUser={currentUser}
							/>
						)}
					/>
					<Redirect to='/map/content' />
				</Switch>
			</div>
		</div>
	);
};

export default Map;
