import React from "react";
import MyForm from "../../../components/myForm";
import UploadForm from "../../../components/uploadForm";
import "./style.scss";

export default function Register({ history, setInfo, info, currentUser }) {
	const [url, urlSet] = React.useState(null);

	return (
		<div id='register'>
			<div className='back-container'>
				<button
					onClick={() => {
						history.push("/map/content");
					}}
					className='btn back'
				>
					COME BACK
				</button>
			</div>
			<div className='main'>
				<div className='form-content'>
					<MyForm
						setInfo={setInfo}
						url={url}
						info={info}
						history={history}
						currentUser={currentUser}
					/>
				</div>
				<div className='picture-content'>
					<UploadForm urlSet={urlSet} />
				</div>
			</div>
		</div>
	);
}
