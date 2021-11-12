export const handleSee = (id) => {
	window.location = `/articles/${id}`;
};
export const handleModify = (id) => {
	window.location = `/myProducts/modifyProduct/${id}`;
};
export const handleNew = () => {
	window.location = `/myProducts/NewProduct`;
};