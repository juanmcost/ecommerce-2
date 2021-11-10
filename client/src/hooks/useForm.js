import { useState } from 'react';

export const useForm = (initialState = {}) => {
	const [form, setForm] = useState(initialState);

	const handleForm = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	
	return { form, handleForm };
}