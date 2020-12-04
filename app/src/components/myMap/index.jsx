import React from "react";
import { Spin, message, Switch } from "antd";
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";
import { projectFirestore } from "../../firebase/config";
import mapStyles from "./mapStyles";
import dumpling from "../../images/dumpling.svg";
import MyInfoWindow from "../myInfoWindow";
const MyMap = ({ currentUser, setInfo, info }) => {
	const [selected, setSelected] = React.useState(null);
	const [label, setLabel] = React.useState(false);

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: "ENTER YOUR OWN KEY",
	});
	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);
	const mapContainerStyle = {
		height: "500px",
		width: "700px",
	};
	const options = {
		styles: mapStyles,
		disableDefaultUI: false,
		zoomControl: false,
	};
	const center = {
		lat: 40.714939,
		lng: -74.007957,
	};

	const onMapClick = async (e) => {
		if (label) {
			if (currentUser.current) {
				setInfo(
					info.map((item) => {
						if (item.id === currentUser.current.id) {
							item.lat = e.latLng.lat();
							item.lng = e.latLng.lng();
							item.drop = true;
							item.show = true;
						}
						return item;
					})
				);
				const collectionRef = projectFirestore
					.collection("users")
					.doc(currentUser.current.id);
				await collectionRef.update({
					lat: e.latLng.lat(),
					lng: e.latLng.lng(),
					drop: true,
					show: true,
				});
				currentUser.current = null;
				setLabel(false);
			} else {
				message.error("Please fill in the personal info before you drop");
			}
		} else {
			if (selected) {
				setSelected(null);
				// mapRef.current.panTo({
				// 	lat: selected.lat,
				// 	lng: selected.lng,
				// });
			}
		}
	};

	if (loadError) return "Error";
	if (!isLoaded) return <Spin size='large' />;
	return (
		<div>
			<span className='mode'>Mode: </span>
			<Switch
				checkedChildren='Label'
				onChange={() => {
					setLabel(!label);
				}}
				checked={label}
			/>
			{!label && (
				<span
					style={{ marginLeft: "10px", fontWeight: "bold", color: "#e6b486" }}
				>
					Tips: Please switch to label mode to enable the label function
				</span>
			)}
			<GoogleMap
				id='map'
				mapContainerStyle={mapContainerStyle}
				zoom={18}
				center={center}
				options={options}
				onClick={onMapClick}
				onLoad={onMapLoad}
			>
				{info &&
					info.map(
						(user) =>
							user.drop &&
							user.show && (
								<Marker
									key={user.id}
									position={{ lat: user.lat, lng: user.lng }}
									onMouseDown={() => {
										setSelected(user);
									}}
									icon={{
										url: dumpling,
										origin: new window.google.maps.Point(0, 0),
										anchor: new window.google.maps.Point(15, 15),
										scaledSize: new window.google.maps.Size(30, 30),
									}}
								/>
							)
					)}
				{selected ? (
					<InfoWindow
						position={{ lat: selected.lat, lng: selected.lng }}
						onCloseClick={() => {
							setSelected(null);
						}}
					>
						<MyInfoWindow
							selected={selected}
							setInfo={setInfo}
							setSelected={setSelected}
						/>
					</InfoWindow>
				) : null}
			</GoogleMap>
		</div>
	);
};

export default MyMap;
