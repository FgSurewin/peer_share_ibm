import React from "react";
import { Modal, Form, Input, message } from "antd";
import { projectFirestore, timestamp } from "../../firebase/config";
import "./style.scss";

export default function MyInfoWindow({ selected, setInfo, setSelected }) {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const layout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 16,
		},
	};
	const tailLayout = {
		wrapperCol: {
			offset: 10,
			// span: 16,
		},
	};
	const onFinish = async (values) => {
		const { nickname, email } = values;
		const collectionRef = projectFirestore.collection("users").doc(selected.id);
		const dropDate = timestamp();
		setInfo((c) =>
			c.map((item) => {
				if (item.id === selected.id) {
					item.pickNickname = nickname;
					item.pickEmail = email;
					item.pickDate = dropDate;
					item.show = false;
				}
				return item;
			})
		);
		await collectionRef.update({
			pickNickname: nickname,
			pickEmail: email,
			show: false,
			pickDate: dropDate,
		});
		setSelected(null);
		message.success("Pick Up Successfully");
		setIsModalVisible(false);
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<div className='infoWindow'>
			<div className='text-info'>
				<p>
					<span role='img' aria-label='fire'>
						🔥
					</span>{" "}
					{selected.supplyName}
				</p>
				<p>Donator: {selected.dropNickname}</p>
				<p>Description: </p>
				<p>{selected.description}</p>
				<button className='btn pick-btn' onClick={showModal}>
					Pick Up
				</button>
			</div>
			<div className='pic-info'>
				<img src={selected.url} alt='supply' />
			</div>
			<Modal
				title='Picker Information'
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					{...layout}
					name='basic'
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
				>
					<Form.Item
						label='Nickname'
						name='nickname'
						rules={[
							{
								required: true,
								message: "Please input your nickname!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Email'
						name='email'
						rules={[
							{
								required: true,
								message: "Please input your email!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item {...tailLayout}>
						<button type='submit' className='btn form-btn'>
							Submit
						</button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
