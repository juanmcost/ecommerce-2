import _ from 'lodash';
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from '../store/product'

export const MultiUploader = () => {
	const { product } = useSelector(product => product)
	const dispatch = useDispatch();
	const label="Upload Multiple Images"
	const id="multi-uploader"
	const [isUploding, setUploding] = useState(false);
	const [uploadedImgs, setUplodedImgs] = useState([]);
	// const handleChange = async e => {
	// 	let { files } = e.target;
	// 	let formData = new FormData();
	// 	for (let i = 0; i < files.length; i++) {
	// 		formData.append('files', files[i]);
	// 	}
	// 	console.log(formData.append)
	// 	console.log('DOS', formData);
	// 	setUploding(true);
	// 	await dispatch(addProduct(formData));
	// 	console.log('PRODUCT', formData.getAll('files'))
	// 	setUplodedImgs(formData.getAll('files'));
	// 	setUploding(false);
	// };

	const handleChange = async e => {
		console.log(e.target)
		let { files } = e.target;
		let formData = new FormData();
		_.forEach(files, file => {
			formData.append('files', file);
		});
		setUploding(true);
		dispatch(addProduct(formData));
		console.log('PRODUCT', formData.getAll('files'));
		setUplodedImgs(formData.getAll('files'));
		setUploding(false);
	};

	return (
			<div className="form-group">
					<label htmlFor={"multi-uploader"} className="text-primary font-weight-bold">{label}</label>
					<div className="d-flex">
							<div className="d-flex">
									<div className="file-uploader-mask d-flex justify-content-center align-items-center">
									</div>
									<input multiple className="file-input" type="file" id={"multi-uploader"} onChange={handleChange} />
							</div>
					</div>
					<div className="d-flex flex-wrap mt-4">
							{
									uploadedImgs && !isUploding ? (
											uploadedImgs.map(uploadedImg => (
													<img src={uploadedImg} key={uploadedImg} alt="UploadedImage" className="img-thumbnail img-fluid uploaded-img mr-2" />
											))
									) : null
							}
					</div>
			</div>
	)
};