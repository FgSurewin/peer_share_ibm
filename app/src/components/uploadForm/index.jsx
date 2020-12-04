import React from "react";
import useStorage from "../../hooks/useStorage";
import { Progress, message, Skeleton } from "antd";
import "./style.scss";
export default function UploadForm({ urlSet }) {
	const [file, setFile] = React.useState(null);
	const { url, progress } = useStorage(file);
	const types = ["image/png", "image/jpeg", "image/jpg"];

	React.useEffect(() => {
		urlSet(url);
	}, [url, urlSet]);

	const handleChange = (e) => {
		let selected = e.target.files[0];

		if (selected && types.includes(selected.type)) {
			setFile(selected);
		} else {
			setFile(null);
			message.error("Please select an image file (png or jpg)");
		}
	};

	return (
		<form id='upload-form'>
			<label>
				<input type='file' onChange={handleChange} />
				Click to upload
			</label>
			<div className='output'>
				{file && <Progress percent={progress} size='small' />}
				{file && url ? (
					<img src={url} alt='supply' />
				) : (
					<Skeleton.Image className='Skeleton' />
				)}
			</div>
		</form>
	);
}
