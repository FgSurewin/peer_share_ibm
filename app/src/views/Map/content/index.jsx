import React from "react";
import MyMap from "../../../components/myMap";
import "./style.scss";

export default function Content({ history, info, setInfo, currentUser }) {
	const goTo = () => {
		history.push("/map/add");
	};

	return (
		<div id='map-content'>
			<div className='map-container'>
				<MyMap info={info} setInfo={setInfo} currentUser={currentUser} />
			</div>
			<div className='show-container'>
				<div className='drop-panel'>
					<span className='font_I'>I</span>
					<span className='font_C'>C</span>
					<span className='font_an'>an</span>
					<button onClick={goTo} className='btn drop'>
						Drop
					</button>
				</div>
				<div className='user-panel'>
					{info.length > 0 &&
						info.map(
							(user) =>
								user.drop && (
									<p key={user.id}>
										<span>{user.dropNickname}</span>
										<span className='drop'> drop </span>
										<span>{user.supplyName}</span>
									</p>
								)
						)}
					{info.length > 0 &&
						info.map(
							(user) =>
								user.drop &&
								!user.show && (
									<p key={user.id}>
										<span>{user.pickNickname}</span>
										<span className='pick'> pick up </span>
										<span>{user.supplyName}</span>
									</p>
								)
						)}
				</div>
			</div>
		</div>
	);
}
