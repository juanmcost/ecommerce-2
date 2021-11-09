import React, { useState, useEffect } from 'react';

export const useForm = (initialState = {}) => {
	const [form, setForm] = React.useState(initialState);

	const handleForm = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	
	return { form, handleForm };
}