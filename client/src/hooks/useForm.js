import { useState } from 'react';

export const useForm = (initialState = {}) => {
	const [form, setForm] = useState(initialState);

	const clearForm = () => {
		setForm(initialState);
		window.location.reload();
		alert('Your review was submitted!');
	};

	const handleForm = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	return { form, handleForm, clearForm };
};