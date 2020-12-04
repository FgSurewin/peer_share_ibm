import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Button, message } from "antd";
import { projectFirestore, timestamp } from "../../firebase/config";
import { generateState } from "./tools";

export default function MyForm({ url, setInfo, info, history, currentUser }) {
	const onFinish = async (values) => {
		const { nickname, email, supplyName, description } = values;
		if (url) {
			const id = uuidv4();
			const collectionRef = projectFirestore.collection("users").doc(id);
			const dropDate = timestamp();
			setInfo([
				...info,
				generateState(
					id,
					nickname,
					email,
					supplyName,
					url,
					description,
					dropDate
				),
			]);
			currentUser.current = generateState(
				id,
				nickname,
				email,
				supplyName,
				url,
				description,
				dropDate
			);
			await collectionRef.set(
				generateState(
					id,
					nickname,
					email,
					supplyName,
					url,
					description,
					dropDate
				)
			);
			message.success("Register Successfully");
			history.push("/map/content");
		} else {
			message.error("Please upload the picture of your supply");
		}
	};

	const onFinishFailed = (errorInfo) => {
		message.error(errorInfo);
	};

	const layout = {
		labelCol: { span: 10 },
		wrapperCol: { span: 18 },
	};
	return (
		<Form
			{...layout}
			name='basic'
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item
				label='Nickname'
				name='nickname'
				rules={[
					{
						required: true,
						message: "Please input your nickname",
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
			<Form.Item
				label='Supply Name'
				name='supplyName'
				rules={[
					{
						required: true,
						message: "Please input your email!",
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item label='Description' name='description'>
				<Input.TextArea />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}
