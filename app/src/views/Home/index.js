import React from "react";
import bigWave from "../../images/bigWave.svg";
import Combine from "../../images/Combine.svg";
import "./style.scss";

const Home = (props) => {
	return (
		<div id='home'>
			<div className='bigWave-container'>
				<img src={bigWave} alt='bigWave' className='bigWave' />
			</div>
			<section className='content'>
				<div className='figure-container'>
					<img src={Combine} alt='Combine' className='figure' />
				</div>
				<div className='intro'>
					<h2 className='intro-title'>Share Your Love</h2>
					<div className='intro-text'>
						<p>New opportunities is here to support</p>
						<p>individuals and families in need at every</p>
						<p>stage of life.</p>
					</div>
					<button
						className='btn join'
						onClick={() => props.history.push("/map/content")}
					>
						Join Now
					</button>
				</div>
			</section>
		</div>
	);
};

export default Home;
